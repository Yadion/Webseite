// Suchfunktion
function searchTable() {
    // Zugriff auf das Suchfeld und den Suchbegriff
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector("table.table"); // Sicherstellen, dass die Bootstrap-Klasse "table" verwendet wird
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    
    // Durchlaufen aller Zeilen in der Tabelle
    rows.forEach(row => {
        const cells = Array.from(row.getElementsByTagName('td'));
        const rowVisible = cells.some(cell => cell.textContent.toLowerCase().includes(input));
        
        // Zeile anzeigen oder ausblenden basierend auf dem Suchbegriff
        row.style.display = rowVisible ? '' : 'none';
    });
}

// Event-Listener für das Suchfeld hinzufügen
document.getElementById('searchInput').addEventListener('input', searchTable);

// Sortierfunktion
function sortTable(columnIndex) {
    let table = document.querySelector("table.table"); // Sicherstellen, dass die Bootstrap-Klasse "table" verwendet wird
    let rows = Array.from(table.querySelectorAll("tbody tr"));
    let thElements = table.querySelectorAll("th");
    
    // Entferne Sortierklassen von allen Spalten
    thElements.forEach((th, index) => {
        if (index !== columnIndex) {
            th.classList.remove("asc", "desc");
        }
    });

    // Bestimmen der Sortierrichtung
    let ascending = thElements[columnIndex].classList.toggle("asc");
    if (!ascending) {
        thElements[columnIndex].classList.toggle("desc", true);
    }

    // Sortiere die Zeilen basierend auf dem Inhalt der angegebenen Spalte
    rows.sort((rowA, rowB) => {
        let cellA = rowA.children[columnIndex].textContent.trim();
        let cellB = rowB.children[columnIndex].textContent.trim();

        // Konvertiere Zelleninhalte in Zahlen für den Vergleich
        let valueA = isNaN(cellA) ? cellA : parseFloat(cellA);
        let valueB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (ascending) {
            return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
        } else {
            return (valueA < valueB) ? 1 : (valueA > valueB) ? -1 : 0;
        }
    });

    // Sortierte Zeilen wieder in den Tabellenkörper einfügen
    rows.forEach(row => table.querySelector("tbody").appendChild(row));
}
