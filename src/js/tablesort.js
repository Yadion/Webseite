// Suchfunktion
function searchTable() {
    // Zugriff auf das Suchfeld und den Suchbegriff
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.querySelector("table");
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
    var table = document.querySelector("table");
    var rows = Array.from(table.querySelectorAll("tbody tr"));
    var ascending = table.querySelectorAll("th")[columnIndex].classList.toggle("asc");

    rows.sort((rowA, rowB) => {
        var cellA = rowA.children[columnIndex].textContent.trim();
        var cellB = rowB.children[columnIndex].textContent.trim();

        // Konvertiere Zelleninhalte in Zahlen für den Vergleich
        var valueA = isNaN(cellA) ? cellA : parseFloat(cellA);
        var valueB = isNaN(cellB) ? cellB : parseFloat(cellB);

        if (ascending) {
            return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
        } else {
            return (valueA < valueB) ? 1 : (valueA > valueB) ? -1 : 0;
        }
    });

    rows.forEach(row => table.querySelector("tbody").appendChild(row));
}
