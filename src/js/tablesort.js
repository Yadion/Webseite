let chartInstance = null;
let isChartVisible = false; // Status des Diagramms (angezeigt oder versteckt)

// Suchfunktion
function searchTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector("table.table");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    rows.forEach(row => {
        const cells = Array.from(row.getElementsByTagName('td'));
        const rowVisible = cells.some(cell => cell.textContent.toLowerCase().includes(input));
        
        row.style.display = rowVisible ? '' : 'none';
    });

    // Wenn die Tabelle gefiltert wird, aktualisiere auch das Diagramm
    if (isChartVisible) {
        updateChart();
    }
}

// Event-Listener für das Suchfeld hinzufügen
document.getElementById('searchInput').addEventListener('input', searchTable);

// Sortierfunktion
function sortTable(columnIndex) {
    let table = document.querySelector("table.table");
    let rows = Array.from(table.querySelectorAll("tbody tr"));
    let thElements = table.querySelectorAll("th");

    thElements.forEach((th, index) => {
        if (index !== columnIndex) {
            th.classList.remove("asc", "desc");
        }
    });

    let ascending = thElements[columnIndex].classList.toggle("asc");
    if (!ascending) {
        thElements[columnIndex].classList.toggle("desc", true);
    }

    rows.sort((rowA, rowB) => {
        let cellA = rowA.children[columnIndex].textContent.trim();
        let cellB = rowB.children[columnIndex].textContent.trim();

        let valueA = isNaN(cellA) ? cellA : parseFloat(cellA);
        let valueB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (ascending) {
            return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
        } else {
            return (valueA < valueB) ? 1 : (valueA > valueB) ? -1 : 0;
        }
    });

    rows.forEach(row => table.querySelector("tbody").appendChild(row));
}

// Diagramm aktualisieren
function updateChart() {
    const chartContainer = document.getElementById('chartContainer');
    const chartCanvas = document.getElementById('myChart');
    
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }

    const labels = [];
    const data2021 = [];
    const data2022 = [];
    const data2023 = [];

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            const cells = row.getElementsByTagName('td');
            labels.push(cells[1].textContent);
            data2021.push(parseFloat(cells[2].textContent));
            data2022.push(parseFloat(cells[3].textContent));
            data2023.push(parseFloat(cells[4].textContent));
        }
    });

    if (labels.length > 0) {
        const ctx = chartCanvas.getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '2021',
                        data: data2021,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: '2022',
                        data: data2022,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: '2023',
                        data: data2023,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        chartContainer.style.display = 'block';
    } else {
        chartContainer.style.display = 'none'; // Verstecke den Container, wenn keine Daten vorhanden sind
    }
}

// Event-Listener für den Diagramm-Button
document.getElementById('showChartBtn').addEventListener('click', function() {
    const chartContainer = document.getElementById('chartContainer');

    if (isChartVisible) {
        // Diagramm ausblenden
        chartContainer.style.display = 'none';
        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }
    } else {
        // Diagramm anzeigen
        updateChart();
        chartContainer.style.display = 'block';

        // Sanft zum Ende des Diagramms scrollen
        setTimeout(() => {
            // Sicherstellen, dass das Diagramm vollständig gerendert ist, bevor gescrollt wird
            chartContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });

            // Zusätzliche Scroll-Anpassung, um sicherzustellen, dass das Ende des Diagramms sichtbar ist
            const chartBottom = chartContainer.getBoundingClientRect().bottom + window.scrollY;
            window.scrollTo({
                top: chartBottom,
                behavior: 'smooth'
            });
        }, 100); // Warten, bis das Diagramm gerendert ist
    }

    isChartVisible = !isChartVisible; // Status umschalten
});
