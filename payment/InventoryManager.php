<?php

class InventoryManager {
    private $filepath;
    private $eventStartDate = '2026-05-13';
    private $eventEndDate = '2026-05-18';
    private $defaultCapacity = 30;

    public function __construct($filepath = null) {
        $this->filepath = $filepath ?: __DIR__ . '/data/ec2026_stabling_inventory.json';

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
        list($data, ) = $this->readFileLocked();
        return $data;
    }

    private function datesBetween($from, $to) {
        $dates = [];
        $start = new DateTime($from);
        $end = new DateTime($to);
        if ($end < $start) return $dates;
        $period = new DatePeriod($start, new DateInterval('P1D'), $end->modify('+1 day'));
        foreach ($period as $d) {
            $dates[] = $d->format('Y-m-d');
        }
        return $dates;
    }

    public function getAvailability($from, $to) {
        $data = $this->loadInventory();
        $capacity = $data['permanentCapacity'];
        $daily = [];
        $minAvailable = $capacity;
        foreach ($this->datesBetween($from, $to) as $date) {
            $entry = isset($data['dailyOccupancy'][$date])
                ? $data['dailyOccupancy'][$date]
                : ['booked' => 0, 'manualReserved' => 0, 'available' => $capacity];
            $daily[$date] = $entry['available'];
            if ($entry['available'] < $minAvailable) $minAvailable = $entry['available'];
        }
        return [
            'permanentCapacity' => $capacity,
            'dailyAvailability' => $daily,
            'minAvailable' => $minAvailable,
            'lastUpdated' => $data['lastUpdated']
        ];
    }

    public function canBook($stablesCount, $from, $to) {
        $stablesCount = (int)$stablesCount;
        if ($stablesCount <= 0) {
            return ['ok' => false, 'reason' => 'Stable count must be positive'];
        }
        $dates = $this->datesBetween($from, $to);
        if (empty($dates)) {
            return ['ok' => false, 'reason' => 'Invalid date range'];
        }
        $data = $this->loadInventory();
        $capacity = $data['permanentCapacity'];
        foreach ($dates as $date) {
            $entry = isset($data['dailyOccupancy'][$date])
                ? $data['dailyOccupancy'][$date]
                : ['booked' => 0, 'manualReserved' => 0, 'available' => $capacity];
            $used = $entry['booked'] + $entry['manualReserved'];
            if ($used + $stablesCount > $capacity) {
                return [
                    'ok' => false,
                    'reason' => "Only {$entry['available']} stables available on $date",
                    'date' => $date,
                    'available' => $entry['available']
                ];
            }
        }
        return ['ok' => true];
    }

    public function deductInventory($orderId, $name, $stablesCount, $from, $to) {
        $orderId = (int)$orderId;
        $stablesCount = (int)$stablesCount;
        if ($stablesCount <= 0) return false;

        $fp = fopen($this->filepath, 'c+');
        if (!$fp) return false;
        flock($fp, LOCK_EX);
        $content = stream_get_contents($fp);
        $data = json_decode($content, true);
        if (!is_array($data)) $data = $this->emptyState();

        foreach ($data['bookings'] as $b) {
            if ((int)$b['orderId'] === $orderId) {
                flock($fp, LOCK_UN);
                fclose($fp);
                return true;
            }
        }

        $dates = $this->datesBetween($from, $to);
        foreach ($dates as $date) {
            if (!isset($data['dailyOccupancy'][$date])) {
                $data['dailyOccupancy'][$date] = [
                    'booked' => 0,
                    'manualReserved' => 0,
                    'available' => $data['permanentCapacity']
                ];
            }
            $data['dailyOccupancy'][$date]['booked'] += $stablesCount;
            $data['dailyOccupancy'][$date]['available'] =
                $data['permanentCapacity']
                - $data['dailyOccupancy'][$date]['booked']
                - $data['dailyOccupancy'][$date]['manualReserved'];
        }

        $data['bookings'][] = [
            'orderId' => $orderId,
            'name' => $name,
            'stablesCount' => $stablesCount,
            'fromDate' => $from,
            'toDate' => $to,
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

    public function addManualReserve($date, $count, $reason, $by = 'admin') {
        $count = (int)$count;
        if ($count <= 0) return false;

        $fp = fopen($this->filepath, 'c+');
        if (!$fp) return false;
        flock($fp, LOCK_EX);
        $content = stream_get_contents($fp);
        $data = json_decode($content, true);
        if (!is_array($data)) $data = $this->emptyState();

        if (!isset($data['dailyOccupancy'][$date])) {
            $data['dailyOccupancy'][$date] = [
                'booked' => 0,
                'manualReserved' => 0,
                'available' => $data['permanentCapacity']
            ];
        }
        $data['dailyOccupancy'][$date]['manualReserved'] += $count;
        $data['dailyOccupancy'][$date]['available'] =
            $data['permanentCapacity']
            - $data['dailyOccupancy'][$date]['booked']
            - $data['dailyOccupancy'][$date]['manualReserved'];

        $data['manualReserves'][] = [
            'date' => $date,
            'count' => $count,
            'reason' => $reason,
            'by' => $by,
            'at' => gmdate('c')
        ];

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return true;
    }

    public function rebuildFromDB($conn) {
        $data = $this->emptyState();

        $result = $conn->query(
            "SELECT id, name, stablingCount, stablingFrom, stablingTo
             FROM ec2026
             WHERE order_status IN ('Success', 'Successful')
               AND stablingType = 'PERMANENT'
               AND stablingCount > 0"
        );

        if (!$result) {
            return [false, 'Query failed: ' . $conn->error];
        }

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
                'orderId' => (int)$row['id'],
                'name' => $row['name'],
                'stablesCount' => $count,
                'fromDate' => $row['stablingFrom'],
                'toDate' => $row['stablingTo'],
                'bookingDate' => null,
                'status' => 'success'
            ];
        }

        // Preserve manual reserves from existing file (rebuild only recomputes bookings)
        $existing = null;
        if (file_exists($this->filepath)) {
            $existing = json_decode(file_get_contents($this->filepath), true);
        }
        if (is_array($existing) && !empty($existing['manualReserves'])) {
            $data['manualReserves'] = $existing['manualReserves'];
            foreach ($existing['manualReserves'] as $r) {
                $date = $r['date'];
                $count = (int)$r['count'];
                if (!isset($data['dailyOccupancy'][$date])) {
                    $data['dailyOccupancy'][$date] = [
                        'booked' => 0,
                        'manualReserved' => 0,
                        'available' => $data['permanentCapacity']
                    ];
                }
                $data['dailyOccupancy'][$date]['manualReserved'] += $count;
            }
        }

        // Recompute available across all days
        foreach ($data['dailyOccupancy'] as $date => $entry) {
            $data['dailyOccupancy'][$date]['available'] =
                $data['permanentCapacity'] - $entry['booked'] - $entry['manualReserved'];
        }

        $data['lastRebuiltFromDB'] = gmdate('c');
        $this->writeFile($data);
        return [true, count($data['bookings']) . ' bookings loaded'];
    }
}
