<?php

require_once('api-config.php');

function fetchAccessToken() {
    global $consumerKey, $consumerSecret; // Zugriff auf die Variablen aus api-config.php
    $encodedCredentials = base64_encode("$consumerKey:$consumerSecret");

    $tokenUrl = 'https://api.srgssr.ch/oauth/v1/accesstoken?grant_type=client_credentials';
    $ch = curl_init($tokenUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ''); // Set an empty body
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Basic ' . $encodedCredentials,
        'Content-Length: 0', // Explicitly set Content-Length to 0
        'Cache-Control: no-cache'
    ));

    $tokenResponse = curl_exec($ch);
    if ($tokenResponse === false) {
        echo 'cURL Error: ' . curl_error($ch);
        return null;
    }
    curl_close($ch);

    $tokenData = json_decode($tokenResponse, true);
    if (!isset($tokenData['access_token'])) {
        echo 'API Error: Access token not found in response';
        echo "\nResponse: " . print_r($tokenData, true);  // Print API response to inspect
        return null;
    }

    return $tokenData['access_token'];
}

function fetchAudioData() {
    $accessToken = fetchAccessToken();
    if (!$accessToken) {
        return "Failed to retrieve access token.";
    }
    
    // URL to read the songlist from the channel
    $url = "https://api.srgssr.ch/audiometadata/v2/radio/songlist?channelId=dd0fa1ba-4ff6-4e1a-ab74-d7e49057d96f&bu=srf";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer ' . $accessToken,
        'Cache-Control: no-cache'
    ));

    $response = curl_exec($ch);
    if ($response === false) {
        return ['error' => curl_error($ch)];  // Return or handle error appropriately
    }
    curl_close($ch);
    
    // Decode the JSON response into an array
    $responseData = json_decode($response, true);
    if ($responseData === null) {
        return ['error' => 'Failed to decode JSON response']; // Handle JSON decoding error
    }
    
    return $responseData;
}

// Return the data when this script is executed
echo json_encode(fetchAudioData(), JSON_PRETTY_PRINT);
return fetchAudioData();
?>
