const data = [
    { country: 'Deutschland', company: 'WV', emissions: 27 },
    { country: 'Frankreich', company: 'Company B', emissions: 6000 },
    { country: 'Spanien', company: 'Company C', emissions: 6000 },
    { country: 'Italien', company: 'Company D', emissions: 6000 },
    { country: 'Schweitz', company: 'Company E', emissions: 6000 },
    { country: 'Polen', company: 'Company F', emissions: 6000 },
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
