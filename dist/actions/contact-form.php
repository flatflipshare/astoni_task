<?php
// Check if it's an AJAX request
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
    // Prepare the JSON response
    $response = array(
        'status' => 'success',
        'message' => 'AJAX request received',
        'data' => array(
            'title' => 'Отлично!',
            'msg' => 'Сообщение отправлено'
        )
    );

    // Set the content type to JSON
    header('Content-Type: application/json');

    // Encode the response as JSON and output it
    echo json_encode($response);
    exit;
} else {
    // Handle non-AJAX requests here
    // ...
}
?>
