<?php include('crypto.php');
require("dbconnect.php");

$name = isset($_POST['name']) ? $_POST['name'] : '';
$parentName = isset($_POST['parentName']) ? $_POST['parentName'] : '';
$dob = isset($_POST['dob']) ? $_POST['dob'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$emergencyContact = isset($_POST['emergencyContact']) ? $_POST['emergencyContact'] : '';
$emergencyRelation = isset($_POST['emergencyRelation']) ? $_POST['emergencyRelation'] : '';
$clubName = isset($_POST['clubName']) ? $_POST['clubName'] : '';
$selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : ''; 
$eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : ''; 
$stablingType = isset($_POST['stablingType']) ? $_POST['stablingType'] : 'NONE';
$stablingCount = isset($_POST['stablingCount']) ? $_POST['stablingCount'] : 0;
$stablingFrom = isset($_POST['stablingFrom']) ? $_POST['stablingFrom'] : '';
$stablingTo = isset($_POST['stablingTo']) ? $_POST['stablingTo'] : '';
$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$currency = "INR";

// Handle Age Proof Upload
$ageProofPath = '';
if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] == 0) {
    $uploadDir = 'uploads/ec2026/age_proofs/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES['ageProof']['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_age_proof_' . time() . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;
    
    if (move_uploaded_file($_FILES['ageProof']['tmp_name'], $targetPath)) {
        $ageProofPath = $targetPath;
    }
}

$sql = "INSERT INTO ec2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, amount, currency) 
        VALUES ('".$conn->real_escape_string($name)."', 
                '".$conn->real_escape_string($parentName)."', 
                '".$conn->real_escape_string($dob)."', 
                '".$conn->real_escape_string($address)."', 
                '".$conn->real_escape_string($mobile)."', 
                '".$conn->real_escape_string($email)."', 
                '".$conn->real_escape_string($emergencyContact)."', 
                '".$conn->real_escape_string($emergencyRelation)."', 
                '".$conn->real_escape_string($clubName)."', 
                '".$conn->real_escape_string($selectedEvents)."', 
                '".$conn->real_escape_string($eventHorses)."', 
                '".$conn->real_escape_string($stablingType)."', 
                '".(int)$stablingCount."', 
                '".$conn->real_escape_string($stablingFrom)."', 
                '".$conn->real_escape_string($stablingTo)."', 
                '".$conn->real_escape_string($ageProofPath)."', 
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
