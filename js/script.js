let url = 'https://312806-4.web.fhgr.ch/php/unload.php';
let data;
let currentChartType = 'last_24h';

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function init(){
    data = await fetchData(url);
    updateChart();
    displayMostPlayedLastYear();
}

function displayMostPlayedLastYear() {
    const mostPlayedLastYearElement = document.getElementById('mostPlayedLastYear');
    const songDurationTextElement = document.getElementById('songDurationText');

    const mostPlayedLastYear = data.last_year[0]; // Der meistgespielte Song sollte der erste Eintrag sein
    if (mostPlayedLastYear) {
        const { title, artist, play_count, duration } = mostPlayedLastYear;
        mostPlayedLastYearElement.textContent = `Dieser Song dominierte das letzte Jahr: ${title} von ${artist} (${play_count} Mal gespielt).`;

        // Berechne die Gesamtlaufzeit in Sekunden und runde sie
        const totalSeconds = Math.round(play_count * duration / 1000);

        // Umrechnung in Minuten und Stunden
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);

        // Restliche Minuten nach Entfernung der Stunden
        const remainingMinutes = totalMinutes % 60;

        // Text für die Anzeige vorbereiten
        let durationText = `Das Lied lief somit ${totalSeconds} Sekunden auf SRF3. `;
        durationText += `Das sind rund ${totalMinutes} Minuten `;
        if (totalHours > 0) {
            durationText += `oder ${totalHours} Stunde${totalHours > 1 ? 'n' : ''}`;
            if (remainingMinutes > 0) {
                durationText += ` und ${remainingMinutes} Minute${remainingMinutes > 1 ? 'n' : ''}`;
            }
        } else if (remainingMinutes > 0) {
            durationText += `oder ${remainingMinutes} Minute${remainingMinutes > 1 ? 'n' : ''}`;
        }
        durationText += ".";

        // Anzeigen des Textes
        songDurationTextElement.textContent = durationText;
    } else {
        mostPlayedLastYearElement.textContent = "Keine Daten verfügbar";
        songDurationTextElement.textContent = "";
    }
}

function updateChart() {
    const canvas = document.querySelector('#topTenChart');
    let labels, playCounts, label, chartType;

    switch(currentChartType) {
        case 'last_24h':
            labels = data.last_24h.map(entry => {
                if (window.innerWidth < 480) {
                    return entry.title;
                } else {
                    return `${entry.title} (${entry.artist})`;
                }
            });
            playCounts = data.last_24h.map(entry => entry.play_count);
            label = 'So oft wurde dieser Song in den letzten 24 Stunden gespielt';
            chartType = 'bar';
            break;
        case 'last_month':
            labels = data.last_month.map(entry => {
                if (window.innerWidth < 480) {
                    return entry.title;
                } else {
                    return `${entry.title} (${entry.artist})`;
                }
            });
            playCounts = data.last_month.map(entry => entry.play_count);
            label = 'So oft wurde dieser Song im letzten Monat gespielt';
            chartType = 'doughnut';
            break;
        case 'last_year':
            labels = data.last_year.map(entry => {
                if (window.innerWidth < 480) {
                    return entry.title;
                } else {
                    return `${entry.title} (${entry.artist})`;
                }
            });
            playCounts = data.last_year.map(entry => entry.play_count);
            label = 'So oft wurde dieser Song im letzten Jahr gespielt';
            chartType = 'horizontalBar';
            break;
        default:
            break;
    }

    createChart(canvas, labels, playCounts, label, chartType);
}

function createChart(canvas, labels, data, label, chartType) {
    // Zerstöre vorheriges Diagramm, falls vorhanden
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    
    let chartConfig;

    switch(chartType) {
        case 'bar':
            chartConfig = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        borderWidth: 1,
                        backgroundColor: [
                            '#1f77b4', // Blau
                            '#17becf', // Türkis
                            '#2ca02c', // Grün
                            '#bcbd22', // Gelb
                            '#ff7f0e', // Orange
                            '#d62728', // Rot
                            '#e377c2', // Pink
                            '#9467bd', // Lila
                            '#8c564b', // Braun
                            '#7f7f7f'  // Grau
                        ]
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                precision: 0
                            }
                        }
                    }
                }
            };
            break;
        case 'doughnut':
            chartConfig = {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        borderWidth: 1,
                        backgroundColor: [
                            '#1f77b4',
                            '#17becf',
                            '#2ca02c',
                            '#bcbd22',
                            '#ff7f0e',
                            '#d62728',
                            '#e377c2',
                            '#9467bd',
                            '#8c564b',
                            '#7f7f7f'
                        ]
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            };
            break;
        case 'horizontalBar':
            chartConfig = {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        borderWidth: 1,
                        backgroundColor: [
                            '#1f77b4',
                            '#17becf',
                            '#2ca02c',
                            '#bcbd22',
                            '#ff7f0e',
                            '#d62728',
                            '#e377c2',
                            '#9467bd',
                            '#8c564b',
                            '#7f7f7f'
                        ]
                    }]
                },
                options: {
                    indexAxis: 'y'
                }
            };
            break;
        default:
            break;
    }

    // Erstelle neues Diagramm
    canvas.chart = new Chart(canvas, chartConfig);
}


document.getElementById('last24hButton').addEventListener('click', function() {
    currentChartType = 'last_24h';
    updateChart();
});

document.getElementById('lastMonthButton').addEventListener('click', function() {
    currentChartType = 'last_month';
    updateChart();
});

document.getElementById('lastYearButton').addEventListener('click', function() {
    currentChartType = 'last_year';
    updateChart();
});

init();

// JavaScript
window.addEventListener('load', function() {
    var headerHeight = document.querySelector('header').offsetHeight; // Erfasse die Höhe des Headers
    var footer = document.getElementById('footer'); // Wähle den Footer aus

    footer.style.height = headerHeight + 'px'; // Setze die Höhe des Footers auf die Höhe des Headers
});
