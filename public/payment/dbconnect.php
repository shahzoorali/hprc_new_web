<?php

 $dbhost = 'localhost';
   $dbuser = 'hprcin_hyd';
   $dbpass = 'Hyd@hprc!12';
   $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
   
   if(! $conn ) {
		die('Could not connect: ' . mysql_error());
   }else{
		mysqli_select_db($conn, 'hprcin_hyd') or die(mysqli_error($con));
		
   }
?>