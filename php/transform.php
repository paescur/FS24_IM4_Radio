<?php

// Bindet das Skript extract.php für Rohdaten ein
$data = include('extract_key.php');

// Initialisiert ein Array, um die transformierten Daten zu speichern
$transformedData = [];

// Transformiert und fügt die notwendigen Informationen hinzu
foreach ($data['songList'] as $song) {
    // Konstruiert die neue Struktur mit allen angegebenen Feldern
    $transformedData[] = [
        'isPlayingNow' => $song['isPlayingNow'],
        'date' => $song['date'],
        'duration' => $song['duration'] ?? null,
        'title' => $song['title'],
        'artist' => $song['artist']['name']
    ];
}

// Kodiert die transformierten Daten in JSON
$jsonData = json_encode($transformedData, JSON_PRETTY_PRINT);

// Gibt die JSON-Daten zurück, anstatt sie auszugeben
return $jsonData;
?>