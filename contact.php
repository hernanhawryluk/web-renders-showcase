<?php
    $message = '';
    foreach($_POST as $key => $value) {
        $message .= "$key => $value\n";
    }

    mail('hernanhawryluk@gmail.com', 'New Message from NBL Renders Website', $message);
    header('Location: index.html');
?>