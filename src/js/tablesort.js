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
