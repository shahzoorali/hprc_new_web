<?php

  $dbhost = '103.21.59.27';
  $dbuser = 'hprcin_hyd';
  $dbpass = 'Hyd@hprc!12';
  $dbname = 'hprcin_hyd';

  $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

  if (!$conn) {
    die('Could not connect: ' . mysqli_connect_error());
  }
?>