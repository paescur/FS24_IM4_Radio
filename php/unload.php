<?php

// Datenbankkonfiguration einbinden
require_once 'config.php';

// Header setzen, um JSON-Inhaltstyp zurückzugeben
header('Content-Type: application/json');

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query, um Daten für die letzten 24 Stunden auszuwählen und zu aggregieren
    $sql24h = "SELECT 
        title, 
        artist, 
        COUNT(DISTINCT CONCAT(title, date)) AS play_count
    FROM 
        SongData
    WHERE 
        date >= NOW() - INTERVAL 1 DAY
    GROUP BY 
        title, 
        artist
    ORDER BY 
        play_count DESC
    LIMIT 
        10;
    ";

    // SQL-Query, um Daten für den letzten Monat auszuwählen und zu aggregieren
    $sqlMonth = "SELECT 
        title, 
        artist, 
        COUNT(DISTINCT CONCAT(title, date)) AS play_count
    FROM 
        SongData
    WHERE 
        date >= NOW() - INTERVAL 1 MONTH
    GROUP BY 
        title, 
        artist
    ORDER BY 
        play_count DESC
    LIMIT 
        10;
    ";

    // SQL-Query, um Daten für das letzte Jahr auszuwählen und zu aggregieren
    $sqlYear = "SELECT 
        title, 
        artist,
        duration, 
        COUNT(DISTINCT CONCAT(title, date)) AS play_count
    FROM 
        SongData
    WHERE 
        date >= NOW() - INTERVAL 1 YEAR
    GROUP BY 
        title, 
        artist
    ORDER BY 
        play_count DESC
    LIMIT 
        10;
    ";

    // Bereitet die SQL-Anweisungen vor
    $stmt24h = $pdo->prepare($sql24h);
    $stmtMonth = $pdo->prepare($sqlMonth);
    $stmtYear = $pdo->prepare($sqlYear);

    // Führt die Abfragen aus
    $stmt24h->execute();
    $stmtMonth->execute();
    $stmtYear->execute();

    // Holt alle passenden Einträge
    $results24h = $stmt24h->fetchAll();
    $resultsMonth = $stmtMonth->fetchAll();
    $resultsYear = $stmtYear->fetchAll();

    // Gibt die Ergebnisse im JSON-Format zurück
    echo json_encode([
        'last_24h' => $results24h,
        'last_month' => $resultsMonth,
        'last_year' => $resultsYear
    ]);
} catch (PDOException $e) {
    // Gibt eine Fehlermeldung zurück, wenn etwas schiefgeht
    echo json_encode(['error' => $e->getMessage()]);
}

