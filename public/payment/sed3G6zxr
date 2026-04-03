<html>
<head>
<title>CCAvenue Payment</title>
</head>
<body>
<center>
 
<?php include('crypto.php');
require("dbconnect.php");?>
<?php 
//echo "<pre>"; print_r($_POST); echo "vgreddy"; exit;

    $name= $_POST['merchant_param1'];
    $email= $_POST['merchant_param2'];
    $phone= $_POST['merchant_param3'];
    $memberId= $_POST['merchant_param4'];
    $towards= $_POST['merchant_param5'];
    $amount= $_POST['amount'];
     $currency= "INR";//$_POST['currency'];

     $sql = "INSERT INTO orders (name, email, phone,memberId,towards,amount,currency)
		VALUES ('".$name."', '".$email."', '".$phone."','".$memberId."','".$towards."','".$amount."','".$currency."')";     

    $conn->query($sql);
    $order_id = $conn->insert_id;
    
	error_reporting(1);
	
	$merchant_data='order_id='.$order_id.'&'; 
	$merchant_data.='merchant_id=195053&';
	$merchant_data.='currency=INR&';
	$merchant_data.='redirect_url=https://hprc.in/payment/success.php&';
	$merchant_data.='cancel_url=https://hprc.in/payment/success.php&';
	$merchant_data.='language=EN&';
	$working_key='D21542B21357F51DA6027649B1E12DFE';//Shared by CCAVENUES
	$access_code='AVWW81FJ19BV33WWVB';//Shared by CCAVENUES
	
	foreach ($_POST as $key => $value){
		$merchant_data.=$key.'='.$value.'&';
		//$keyinc = $key+1;
		//if(count($_POST) == $keyinc){
	//	   $merchant_data.=$keyinc.'='.$order_id.'&'; 
	//	}
	}
 
	$encrypted_data=encrypt($merchant_data,$working_key); // Method for encrypting the data. 
 
?>
<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 

<?php
echo "<input type=hidden name=encRequest value=$encrypted_data>";
echo "<input type=hidden name=access_code value=$access_code>";
?>
</form>
</center>
<script language='javascript'>document.redirect.submit();</script>
</body>
</html>