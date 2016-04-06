<?php 

	require("phpmailer/PHPMailerAutoload.php");
		
	file_put_contents('php://stderr', print_r($_POST, TRUE)); 
	
	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["body"];
	
	$constants = parse_ini_file("../iniPortfolio/myPortfolio.ini");
	
	$mail = new PHPMailer;
	
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.gmail.com';  					  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = $constants['username'];             // SMTP username
	$mail->Password = $constants['password'];             // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 25;                                     // TCP port to connect to
	
	$mail->setFrom('from@noreply.com');
	$mail->addAddress($constants['admin'], '2B');     // Add a recipient
	file_put_contents('php://stderr', print_r($constants['admin'], TRUE));
	
	$mail->Subject = 'Message from ' . $name . ' Email ' . $email;
	$mail->Body =  'Email: ' . $email . ' This is message: ' . $message;
	file_put_contents('php://stderr', print_r($mail->Body, TRUE));
	file_put_contents('php://stderr', print_r("message : " . $message, TRUE));
	
	if(!$mail->send()) {
		
		file_put_contents('php://stderr', print_r("kao da nije posalo", TRUE));
		$data = array("name" => $name);
		file_put_contents('php://stderr', print_r(json_encode($data), TRUE));
		echo json_encode($data);
		
	} else {
		file_put_contents('php://stderr', print_r("usao u else", TRUE));
		
		$data = array("name" => $name);
		file_put_contents('php://stderr', print_r(json_encode($data), TRUE));
		echo json_encode($data);
	}
	

?>