<?php include('crypto.php');
require("dbconnect.php");

$name = isset($_POST['name']) ? $_POST['name'] : '';
$fatherName = isset($_POST['fatherName']) ? $_POST['fatherName'] : '';
$dob = isset($_POST['dob']) ? $_POST['dob'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$emergencyContact = isset($_POST['emergencyContact']) ? $_POST['emergencyContact'] : '';
$emergencyRelation = isset($_POST['emergencyRelation']) ? $_POST['emergencyRelation'] : '';
$efiMemberNo = isset($_POST['efiMemberNo']) ? $_POST['efiMemberNo'] : '';
$efiGrade = isset($_POST['efiGrade']) ? $_POST['efiGrade'] : '';
$clubName = isset($_POST['clubName']) ? $_POST['clubName'] : '';
$selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : ''; 
$eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : ''; 
$horseName = isset($_POST['horseName']) ? $_POST['horseName'] : '';
$horseEfiReg = isset($_POST['horseEfiReg']) ? $_POST['horseEfiReg'] : '';
$horseColour = isset($_POST['horseColour']) ? $_POST['horseColour'] : '';
$horseSex = isset($_POST['horseSex']) ? $_POST['horseSex'] : '';
$horseAge = isset($_POST['horseAge']) ? $_POST['horseAge'] : '';
$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$currency = "INR";

$sql = "INSERT INTO ec2026 (name, fatherName, dob, address, mobile, email, emergencyContact, emergencyRelation, efiMemberNo, efiGrade, clubName, selectedEvents, eventHorses, horseName, horseEfiReg, horseColour, horseSex, horseAge, amount, currency) 
        VALUES ('".$conn->real_escape_string($name)."', 
                '".$conn->real_escape_string($fatherName)."', 
                '".$conn->real_escape_string($dob)."', 
                '".$conn->real_escape_string($address)."', 
                '".$conn->real_escape_string($mobile)."', 
                '".$conn->real_escape_string($email)."', 
                '".$conn->real_escape_string($emergencyContact)."', 
                '".$conn->real_escape_string($emergencyRelation)."', 
                '".$conn->real_escape_string($efiMemberNo)."', 
                '".$conn->real_escape_string($efiGrade)."', 
                '".$conn->real_escape_string($clubName)."', 
                '".$conn->real_escape_string($selectedEvents)."', 
                '".$conn->real_escape_string($eventHorses)."', 
                '".$conn->real_escape_string($horseName)."', 
                '".$conn->real_escape_string($horseEfiReg)."', 
                '".$conn->real_escape_string($horseColour)."', 
                '".$conn->real_escape_string($horseSex)."', 
                '".$conn->real_escape_string($horseAge)."', 
                '".$conn->real_escape_string($amount)."', 
                '$currency')";

$conn->query($sql);
$order_id = $conn->insert_id;

error_reporting(1);

$merchant_data='order_id='.$order_id.'&'; 
$merchant_data.='merchant_id=195053&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/ec2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/ec2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$working_key='D21542B21357F51DA6027649B1E12DFE';//Shared by CCAVENUES
$access_code='AVWW81FJ19BV33WWVB';//Shared by CCAVENUES

// Send billing payload specifically to CCAvenue:
$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_address='.$address.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='billing_email='.$email.'&';

$encrypted_data=encrypt($merchant_data,$working_key); 
?>
<html>
<head>
<title>CCAvenue Payment</title>
</head>
<body>
<center>
<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
<input type=hidden name=encRequest value="<?php echo $encrypted_data; ?>">
<input type=hidden name=access_code value="<?php echo $access_code; ?>">
</form>
</center>
<script language='javascript'>document.redirect.submit();</script>
</body>
</html>
