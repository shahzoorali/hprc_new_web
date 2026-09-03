<?php
// Isolated stabling inventory for the October 2026 camp — covers the National
// Qualifier (14–16 Oct) & TSEA State Equestrian Championship (16–18 Oct).
//
// Stables are 30 permanent boxes for the 14–19 Oct window.
// Flat packages and per-day early arrival ledger.

class InventoryManagerOctCamp {
    private $filepath;
    private $eventStartDate = '2026-10-14'; // Camp opens 14 Oct
    private $eventEndDate = '2026-10-19';   // Camp closes 19 Oct
    private $defaultCapacity = 30;

    public function __construct($filepath = null) {
        $this->filepath = $filepath ?: __DIR__ . '/data/camp_oct2026_stabling_inventory.json';

        $dir = dirname($this->filepath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        if (!file_exists($this->filepath)) {
            $this->writeFile($this->emptyState());
        }
    }

    private function emptyState() {
        $dailyOccupancy = [];
        $period = new DatePeriod(
            new DateTime($this->eventStartDate),
            new DateInterval('P1D'),
            (new DateTime($this->eventEndDate))->modify('+1 day')
        );
        foreach ($period as $date) {
            $key = $date->format('Y-m-d');
            $dailyOccupancy[$key] = [
                'booked' => 0,
                'manualReserved' => 0,
                'available' => $this->defaultCapacity
            ];
        }
        return [
            'permanentCapacity' => $this->defaultCapacity,
            'lastUpdated' => gmdate('c'),
            'lastRebuiltFromDB' => null,
            'dailyOccupancy' => $dailyOccupancy,
            'bookings' => [],
            'manualReserves' => []
        ];
    }

    private function readFileLocked() {
        $fp = @fopen($this->filepath, 'r');
        if (!$fp) return [$this->emptyState(), null];
        flock($fp, LOCK_SH);
        $content = stream_get_contents($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        $data = json_decode($content, true);
        if (!is_array($data)) $data = $this->emptyState();
        return [$data, null];
    }

    private function writeFile($data) {
        $data['lastUpdated'] = gmdate('c');
        $fp = fopen($this->filepath, 'c+');
        if (!$fp) return false;
        flock($fp, LOCK_EX);
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }

    public function loadInventory() {
        list($data) = $this->readFileLocked();
        return $data;
    }

    public function getAvailability($fromDate, $toDate) {
        list($data) = $this->readFileLocked();
        $dates = $this->datesBetween($fromDate, $toDate);
        $dailyAvailability = [];
        $minAvailable = $data['permanentCapacity'];

        foreach ($dates as $date) {
            $avail = isset($data['dailyOccupancy'][$date])
                ? $data['dailyOccupancy'][$date]['available']
                : $data['permanentCapacity'];
            $dailyAvailability[$date] = $avail;
            if ($avail < $minAvailable) {
                $minAvailable = $avail;
            }
        }

        $totalStablesBooked = 0;
        if (isset($data['bookings']) && is_array($data['bookings'])) {
            foreach ($data['bookings'] as $b) {
                $totalStablesBooked += (int)($b['stablesCount'] ?? $b['count'] ?? 0);
            }
        }

        return [
            'permanentCapacity' => $data['permanentCapacity'],
            'dailyAvailability' => $dailyAvailability,
            'minAvailable' => max(0, $minAvailable),
            'lastUpdated' => isset($data['lastUpdated']) ? $data['lastUpdated'] : gmdate('c'),
            'lastRebuiltFromDB' => isset($data['lastRebuiltFromDB']) ? $data['lastRebuiltFromDB'] : null,
            'bookingsCount' => isset($data['bookings']) && is_array($data['bookings']) ? count($data['bookings']) : 0,
            'totalStablesBooked' => $totalStablesBooked,
        ];
    }

    public function canBook($count, $fromDate, $toDate) {
        $count = (int)$count;
        if ($count <= 0) return ['ok' => true];
        $avail = $this->getAvailability($fromDate, $toDate);
        if ($avail['minAvailable'] < $count) {
            return [
                'ok' => false,
                'reason' => "Only {$avail['minAvailable']} stable(s) available for the selected dates."
            ];
        }
        return ['ok' => true];
    }

    public function deductInventory($orderId, $riderName, $count, $fromDate, $toDate, $source = 'oct_nq') {
        $count = (int)$count;
        if ($count <= 0) return true;

        $fp = fopen($this->filepath, 'c+');
        if (!$fp) return false;
        flock($fp, LOCK_EX);

        $content = stream_get_contents($fp);
        $data = json_decode($content, true);
        if (!is_array($data)) $data = $this->emptyState();

        $bookingKey = $source . '-' . $orderId;
        if (!isset($data['bookings'])) $data['bookings'] = [];
        foreach ($data['bookings'] as $b) {
            if (isset($b['bookingKey']) && $b['bookingKey'] === $bookingKey) {
                flock($fp, LOCK_UN);
                fclose($fp);
                return true;
            }
        }

        $dates = $this->datesBetween($fromDate, $toDate);
        foreach ($dates as $date) {
            if (!isset($data['dailyOccupancy'][$date])) {
                $data['dailyOccupancy'][$date] = [
                    'booked' => 0,
                    'manualReserved' => 0,
                    'available' => $data['permanentCapacity']
                ];
            }
            $data['dailyOccupancy'][$date]['booked'] += $count;
            $data['dailyOccupancy'][$date]['available'] = max(
                0,
                $data['permanentCapacity']
                    - $data['dailyOccupancy'][$date]['booked']
                    - $data['dailyOccupancy'][$date]['manualReserved']
            );
        }

        $data['bookings'][] = [
            'bookingKey' => $bookingKey,
            'source' => $source,
            'orderId' => $orderId,
            'name' => $riderName,
            'stablesCount' => $count,
            'fromDate' => $fromDate,
            'toDate' => $toDate,
            'bookingDate' => gmdate('c'),
            'status' => 'success'
        ];

        $data['lastUpdated'] = gmdate('c');
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }

    private function datesBetween($fromDate, $toDate) {
        $dates = [];
        try {
            $start = new DateTime($fromDate);
            $end = new DateTime($toDate);
            if ($start > $end) return [];
            $period = new DatePeriod($start, new DateInterval('P1D'), $end);
            foreach ($period as $dt) {
                $dates[] = $dt->format('Y-m-d');
            }
            if (empty($dates) && $start == $end) {
                $dates[] = $start->format('Y-m-d');
            }
        } catch (Exception $e) {
            return [];
        }
        return $dates;
    }

    public function rebuildFromDB($conn) {
        $data = $this->emptyState();

        $sources = [
            ['table' => 'nq_oct_2026', 'source' => 'oct_nq'],
        ];

        foreach ($sources as $src) {
            $table = $src['table'];
            $result = $conn->query(
                "SELECT id, name, stablingCount, stablingFrom, stablingTo
                 FROM `$table`
                 WHERE order_status IN ('Success', 'Successful')
                   AND stablingType <> 'NONE'
                   AND stablingCount > 0"
            );

            if (!$result) continue;

            while ($row = $result->fetch_assoc()) {
                $count = (int)$row['stablingCount'];
                if ($count <= 0) continue;
                if (empty($row['stablingFrom']) || empty($row['stablingTo'])) continue;

                $dates = $this->datesBetween($row['stablingFrom'], $row['stablingTo']);
                foreach ($dates as $date) {
                    if (!isset($data['dailyOccupancy'][$date])) {
                        $data['dailyOccupancy'][$date] = [
                            'booked' => 0,
                            'manualReserved' => 0,
                            'available' => $data['permanentCapacity']
                        ];
                    }
                    $data['dailyOccupancy'][$date]['booked'] += $count;
                }

                $data['bookings'][] = [
                    'bookingKey' => $src['source'] . '-' . (int)$row['id'],
                    'source' => $src['source'],
                    'orderId' => (int)$row['id'],
                    'name' => $row['name'],
                    'stablesCount' => $count,
                    'fromDate' => $row['stablingFrom'],
                    'toDate' => $row['stablingTo'],
                    'bookingDate' => null,
                    'status' => 'success'
                ];
            }
        }

        foreach ($data['dailyOccupancy'] as $date => $entry) {
            $data['dailyOccupancy'][$date]['available'] =
                $data['permanentCapacity'] - $entry['booked'] - $entry['manualReserved'];
        }

        $data['lastRebuiltFromDB'] = gmdate('c');
        $this->writeFile($data);
        return [true, count($data['bookings']) . ' bookings loaded'];
    }
}
