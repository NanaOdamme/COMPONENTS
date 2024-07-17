$(document).ready(function() {
    let tableData = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
        { id: 3, name: 'Mike Johnson', age: 45 },
        
        // Add more initial data as needed
    ];

    let currentPage = 1;
    const rowsPerPage = 5;
    let sortOrder = 'asc';
    let sortColumn = '';

    function renderTable(data) {
        const tableBody = $('#tableBody');
        tableBody.empty();

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(row => {
            const tr = $('<tr></tr>');
            tr.append(`<td class="px-4 py-2 border">${row.name}</td>`);
            tr.append(`<td class="px-4 py-2 border">${row.age}</td>`);
            tr.append(`
                <td class="px-4 py-2 border">
                    <button class="bg-yellow-500 text-white px-2 py-1 rounded edit-row" data-id="${row.id}"><i class="bi bi-pencil"></i></button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded delete-row" data-id="${row.id}"><i class="bi bi-trash"></i></button>
                </td>
            `);
            tableBody.append(tr);
        });
    }

    function renderPagination(data) {
        const pagination = $('#pagination');
        pagination.empty();

        const pageCount = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= pageCount; i++) {
            const btn = $('<button></button>').text(i).addClass('mx-1 px-3 py-1 rounded');
            btn.toggleClass('bg-blue-500 text-white', i === currentPage);
            btn.on('click', function() {
                currentPage = i;
                renderTable(data);
                renderPagination(data);
            });
            pagination.append(btn);
        }
    }

    function sortData(data, column, order) {
        return data.sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    function filterData(data, query) {
        return data.filter(row => row.name.toLowerCase().includes(query.toLowerCase()) || String(row.age).includes(query));
    }

    $('#addRow').on('click', function() {
        const newRow = { id: tableData.length + 1, name: 'New Name', age: 0 };
        tableData.push(newRow);
        renderTable(tableData);
        renderPagination(tableData);
    });

    $('#tableBody').on('click', '.delete-row', function() {
        const id = $(this).data('id');
        tableData = tableData.filter(row => row.id !== id);
        renderTable(tableData);
        renderPagination(tableData);
    });

    $('#tableBody').on('click', '.edit-row', function() {
        const id = $(this).data('id');
        const row = tableData.find(row => row.id === id);
        row.name = prompt('Edit Name', row.name) || row.name;
        row.age = prompt('Edit Age', row.age) || row.age;
        renderTable(tableData);
        renderPagination(tableData);
    });

    $('#searchInput').on('input', function() {
        const query = $(this).val();
        const filteredData = filterData(tableData, query);
        renderTable(filteredData);
        renderPagination(filteredData);
    });

    $('th[data-sort]').on('click', function() {
        const column = $(this).data('sort');
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        sortColumn = column;
        tableData = sortData(tableData, column, sortOrder);
        renderTable(tableData);
        renderPagination(tableData);
    });

    renderTable(tableData);
    renderPagination(tableData);
});
