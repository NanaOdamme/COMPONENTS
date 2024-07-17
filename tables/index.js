const { useState } = React;

const colorCombinations = [
    { id: 1, color1: 'bg-gray-200', color2: 'bg-white' },
    { id: 2, color1: 'bg-blue-100', color2: 'bg-blue-50' },
    { id: 3, color1: 'bg-green-100', color2: 'bg-green-50' },
    { id: 4, color1: 'bg-yellow-100', color2: 'bg-yellow-50' },
    { id: 5, color1: 'bg-red-100', color2: 'bg-red-50' },
    { id: 6, color1: 'bg-purple-100', color2: 'bg-purple-50' },
    { id: 7, color1: 'bg-pink-100', color2: 'bg-pink-50' },
    { id: 8, color1: 'bg-indigo-100', color2: 'bg-indigo-50' },
    { id: 9, color1: 'bg-cyan-100', color2: 'bg-cyan-50' },
    { id: 10,color1:'bg-teal-100', color2: 'bg-teal-50' }
   
];

const CrudTable = ({ columns }) => {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
        { id: 3, name: 'Mike Johnson', age: 45 },
        // Add more initial data as needed
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editRowData, setEditRowData] = useState({});
    const [selectedColorCombination, setSelectedColorCombination] = useState(colorCombinations[0]);

    const filteredData = tableData.filter(row => {
        return columns.some(col => row[col.key].toString().toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const sortData = (column) => {
        const order = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = [...tableData].sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        setTableData(sortedData);
        setSortOrder(order);
        setSortColumn(column);
    };

    const handleSelectAll = () => {
        const updatedData = tableData.map(row => ({ ...row, selected: !selectAll }));
        setTableData(updatedData);
        setSelectAll(!selectAll);
    };

    const handleSelectRow = (id) => {
        const updatedData = tableData.map(row => row.id === id ? { ...row, selected: !row.selected } : row);
        setTableData(updatedData);
    };

    const addRow = () => {
        const newRow = { id: tableData.length + 1, name: 'New Name', age: 0, selected: false };
        setTableData([...tableData, newRow]);
    };

    const editSelectedRows = () => {
        const selectedRow = tableData.find(row => row.selected);
        if (selectedRow) {
            setEditRowData(selectedRow);
            setShowModal(true);
        }
    };

    const deleteSelectedRows = () => {
        const updatedData = tableData.filter(row => !row.selected);
        setTableData(updatedData);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditRowData({ ...editRowData, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedData = tableData.map(row => row.id === editRowData.id ? editRowData : row);
        setTableData(updatedData);
        setShowModal(false);
    };

    const handleColorChange = (e) => {
        const selectedCombination = colorCombinations.find(combo => combo.id === Number(e.target.value));
        setSelectedColorCombination(selectedCombination);
    };

    return (
        <>
        <h1>react crud table components </h1>
        <div className='bg-gray-50 p-5 rounded-lg'>
            <div className="flex justify-between items-center mb-4">
                
                
            </div>
            <div className="flex mb-4 space-x-2">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Search..." />
                
                <button onClick={addRow} className="flex bg-blue-500 text-white px-4 py-2 rounded">
                    <i className="mx-2 bi bi-plus-lg"></i> Add
                </button>
                <button onClick={editSelectedRows} className="flex bg-yellow-500 text-white px-4 py-2 rounded ">
                    <i className="mx-2 bi bi-pencil"></i> Edit
                </button>
                
                <button onClick={deleteSelectedRows} className="flex bg-red-500 text-white px-4 py-2 rounded">
                    <i className="mx-2 bi bi-trash"></i> Delete
                </button>
                
            </div>
            <table className="min-w-full   border-2 border-gray-500">
                <thead className='bg-gray-500 text-white'>
                    <tr>
                        <th className="px-4 py-2 border-r border-gray-600">
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                        </th>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 border-r border-gray-600 cursor-pointer" onClick={() => sortData(col.key)}>
                                {col.label} <i className={`bi ${sortColumn === col.key ? (sortOrder === 'asc' ? 'bi-chevron-up' : 'bi-chevron-down') : 'bi-chevron-expand'}`}></i>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={row.id} className={rowIndex % 2 === 0 ? selectedColorCombination.color1 : selectedColorCombination.color2}>
                            <td className="px-4 py-2 border-r border-gray-600">
                                <input type="checkbox" checked={row.selected || false} onChange={() => handleSelectRow(row.id)} />
                            </td>
                            {columns.map((col, index) => (
                                <td key={index} className="px-4 py-2 border-r border-gray-600">{row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-end'>
            <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="ml-2 my-2 border rounded px-4 py-2">
                    {[5, 10, 15, 20].map((number) => (
                        <option key={number} value={number}>{number} rows per page</option>
                    ))}
                </select>
                <select onChange={handleColorChange} className="ml-2 my-2 border rounded px-4 py-2">
                    {colorCombinations.map((combo) => (
                        <option key={combo.id} value={combo.id}>
                             Color {combo.id}
                        </option>
                    ))}
                </select>
                </div>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}>
                        {page}
                    </button>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Edit Row</h2>
                        <form onSubmit={handleEditSubmit}>
                            {columns.map((col, index) => (
                                <div key={index} className="mb-4">
                                    <label className="block text-gray-700">{col.label}</label>
                                    <input
                                        type="text"
                                        name={col.key}
                                        value={editRowData[col.key]}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
];

ReactDOM.render(<CrudTable columns={columns} />, document.getElementById('root'));
