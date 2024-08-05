const data = [
    { country: 'Deutschland', company: 'WV', emissions: '27t' },
    { country: 'China', company: 'Company B', emissions: 6000 },
    // Weitere fiktive Daten
];

document.addEventListener('DOMContentLoaded', () => {
    loadTableData(data);
});

function loadTableData(data) {
    const tableBody = document.querySelector('#emissionsTable tbody');
    tableBody.innerHTML = '';

    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.country}</td>
            <td>${item.company}</td>
            <td>${item.emissions}</td>
        `;
        tableBody.appendChild(row);
    });
}

function sortTable(key) {
    const sortedData = [...data].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    loadTableData(sortedData);
}
