<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = 'nblrenders@gmail.com';
    $subject = 'Nuevo mensaje desde el sitio web';
    $headers = "From: $email\r\n";

    $emailBody = "Nombre: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Teléfono: $mobile\n\n";
    $emailBody .= "Mensaje:\n$message";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>