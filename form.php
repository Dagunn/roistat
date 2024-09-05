<?php

$logFile = 'form_submissions.log';


function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $name = clean_input($_POST["name"]);
    $site = clean_input($_POST["site"]);
    $phone = clean_input($_POST["phone"]);
    $consent = isset($_POST["consent"]) ? 'Да' : 'Нет';


    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Поле 'Имя' не заполнено.";
    }

    if (empty($site) || !filter_var($site, FILTER_VALIDATE_URL)) {
        $errors[] = "Поле 'Сайт компании' заполнено некорректно.";
    }

    if (empty($phone) || !preg_match("/^\+?\d{7,15}$/", $phone)) {
        $errors[] = "Поле 'Телефон' заполнено некорректно.";
    }

    if ($consent === 'Нет') {
        $errors[] = "Не дано согласие на обработку персональных данных.";
    }

   
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    } else {
        
        $logEntry = "Имя: $name\nСайт: $site\nТелефон: $phone\nСогласие на обработку данных: $consent\nДата: " . date("Y-m-d H:i:s") . "\n\n";

       
        if (file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX)) {
            echo "<p style='color:green;'>Ваши данные успешно отправлены!</p>";
        } else {
            echo "<p style='color:red;'>Ошибка при сохранении данных. Пожалуйста, попробуйте позже.</p>";
        }
    }
} else {
    echo "<p style='color:red;'>Некорректный запрос.</p>";
}
?>