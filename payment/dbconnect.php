<?php

  // Updated to point to remote DB host instead of localhost.
  // Make sure this IP is reachable from the web server / PHP runtime.
  $dbhost = '103.21.59.27';
  $dbuser = 'hprcin_hyd';
  $dbpass = 'Hyd@hprc!12';

  $conn = mysqli_connect($dbhost, $dbuser, $dbpass);

  if (! $conn) {
    die('Could not connect: ' . mysqli_connect_error());
  } else {
    mysqli_select_db($conn, 'hprcin_hyd') or die(mysqli_error($conn));
  }
?>