# FS24_IM4_Radio
 
Kurzbeschreibung des Projekts

Das Projekt analysiert die meistgespielten Songs auf einem Schweizer Radiosender, basierend auf Daten von SRF3. Es präsentiert die 10 Top-Songs der letzten 24 Stunden, des letzten Monats und des letzten Jahres in interaktiven Diagrammen. Die Daten werden von einer PHP-Schnittstelle abgerufen und mit JavaScript und Chart.js visualisiert. Zusätzlich wird der meistgespielte Song des letzten Jahres einzeln angezeigt, mit der Angabe in Sekunden, wie lange dieser Song insgesamt auf SRF3 lief.

Schwierigkeiten / Learnings

API

Auf eine erste Schwierigkeit sind wir relativ früh gestossen. Um zur richtigen API zu kommen und ständig und laufend die Songs abrufen können, ist ein API-Key notwendig. Diesen zu erhalten und richtig im Code einzufügen gestaltete sich nicht gerade einfach. Dank der Hilfe von Beni und ChatGPT konnten die Probleme jedoch überwunden werden. Danach mussten wir uns zuerst einmal in der API zurechtfinden. Auch das am Anfang eine Herausforderung.

chart.js

Eine weitere Schwierigkeit war es, die Diagramme von chart.js auf unsere Bedürfnisse anzupassen. Grundsätzlich ist es sehr einfach, Diagramme einzubauen. Das Gestalten nach eigenen Bedürfnissen ist da aus unserer Sicht schon deutlich anspruchsvoller. Ein Beispiel: Bei einer zu schmalen Bildschirmbreite werden beim horizontalen Balkendiagramm nur fünf der zehn Songlieder angezeigt. Dieses Problem konnten wir nicht lösen.

Figma

Benutzte Ressourcen

Die verwendeten Daten stammen aus der API von SRF und werden in einer MySQL-Datenbank abgespeichert. Die Visualisierung der Daten wird mit chart.js umgesetzt. Für das Entwickeln des Codes wurde ChatGPT als Hilfe benutzt.