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
    { id: 10, color1: 'bg-teal-100', color2: 'bg-teal-50' }
];

const CrudTable = ({ columns, data, addRow, toggleSubTable, handleSelectRow, selectedColorCombination, editSelectedRows, deleteSelectedRows, renderSubTable, rowsPerPage, setCurrentPage, currentPage, isSubTable }) => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div>
            <table className="min-w-full border-2 border-gray-500">
                <thead className='bg-gray-500 text-white'>
                    <tr>
                        <th className="w-36 px-4 py-2 border-r border-gray-600">Actions</th>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 border-r border-gray-600 cursor-pointer">
                                {col.label}
                            </th>
                        ))}
                        {isSubTable && (
                            <th className="w-36 px-4 py-2 border-r border-gray-600">
                                <button onClick={addRow} className="bg-blue-500 text-white px-2 py-1 rounded">
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <React.Fragment key={row.id}>
                            <tr className={rowIndex % 2 === 0 ? selectedColorCombination.color1 : selectedColorCombination.color2}>
                                <td className="px-4 py-2 border-r border-gray-600">
                                <input type="checkbox" checked={row.selected || false} onChange={() => handleSelectRow(row.id, isSubTable ? row.parentId : null)} className="mr-2" />
                                    {!isSubTable && (
                                        <button onClick={() => toggleSubTable(row.id)} className="text-black px-2 py-1 rounded mr-2">
                                            {row.showSubTable ? <i className="bi bi-chevron-down"></i> : <i className="bi bi-chevron-right"></i>}
                                        </button>
                                    )}
                                    {isSubTable && (
                                        <button onClick={() => editSelectedRows(isSubTable ? row.parentId : null)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                    )}
                                    {isSubTable && (
                                    <button onClick={() => deleteSelectedRows()} className=" bg-red-500 text-white px-2 py-1 rounded mr-2">
                    <i className=" bi bi-trash"></i>
                </button>
                                    )}
                                    
                                </td>
                                {columns.map((col, index) => (
                                    <td key={index} className="px-4 py-2 border-r border-gray-600">{row[col.key]}</td>
                                ))}
                            </tr>
                            {!isSubTable && row.showSubTable && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-0">
                                        {renderSubTable(row)}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [tableData, setTableData] = useState([
        { id: 1, name: 'John Doe', age: 28, subTables: [], showSubTable: false, selected: false },
        { id: 2, name: 'Jane Smith', age: 34, subTables: [], showSubTable: false, selected: false },
        { id: 3, name: 'Mike Johnson', age: 45, subTables: [], showSubTable: false, selected: false },
    ]);
    const [columns, setColumns] = useState([
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' }
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedColorCombination, setSelectedColorCombination] = useState(colorCombinations[0]);
    const [showModal, setShowModal] = useState(false);
    const [editRowData, setEditRowData] = useState({});
    const [editRowParentId, setEditRowParentId] = useState(null);

    const addRow = (parentId = null) => {
        const newRow = { id: Date.now(), name: 'New Name', age: 0, subTables: [], showSubTable: false, selected: false, parentId };
        if (parentId) {
            setTableData(tableData.map(row => row.id === parentId ? { ...row, subTables: [...row.subTables, newRow] } : row));
        } else {
            setTableData([...tableData, newRow]);
        }
    };

    const toggleSubTable = (parentId) => {
        setTableData(tableData.map(row => row.id === parentId ? { ...row, showSubTable: !row.showSubTable } : row));
    };

    const handleSelectRow = (id, parentId = null) => {
        const updatedData = tableData.map(row => {
            if (parentId) {
                if (row.id === parentId) {
                    row.subTables = row.subTables.map(subRow => subRow.id === id ? { ...subRow, selected: !subRow.selected } : subRow);
                }
            } else {
                if (row.id === id) {
                    row.selected = !row.selected;
                }
            }
            return row;
        });
        setTableData(updatedData);
    };

    const editSelectedRows = (parentId = null) => {
        let selectedRow;
        if (parentId) {
            const parentRow = tableData.find(row => row.id === parentId);
            if (parentRow) {
                selectedRow = parentRow.subTables.find(subRow => subRow.selected);
            }
        } else {
            selectedRow = tableData.find(row => row.selected);
        }
        if (selectedRow) {
            setEditRowData(selectedRow);
            setEditRowParentId(parentId);
            setShowModal(true);
        }
    };

    const deleteSelectedRows = (parentId = null) => {
        if (parentId) {
            setTableData(tableData.map(row => {
                if (row.id === parentId) {
                    row.subTables = row.subTables.filter(subRow => !subRow.selected);
                }
                return row;
            }));
        } else {
            setTableData(tableData.filter(row => !row.selected).map(row => {
                row.subTables = row.subTables.filter(subRow => !subRow.selected);
                return row;
            }));
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditRowData({ ...editRowData, [name]: value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedData = tableData.map(row => {
            if (row.id === editRowData.id) {
                return editRowData;
            }
            if (editRowParentId && row.id === editRowParentId) {
                row.subTables = row.subTables.map(subRow => subRow.id === editRowData.id ? editRowData : subRow);
            }
            return row;
        });
        setTableData(updatedData);
        setShowModal(false);
    };

    const renderSubTable = (parentRow) => {
        const [subTablePage, setSubTablePage] = useState(1);
        return (
            <CrudTable
                columns={columns}
                data={parentRow.subTables}
                addRow={() => addRow(parentRow.id)}
                toggleSubTable={toggleSubTable}
                handleSelectRow={(id) => handleSelectRow(id, parentRow.id)}
                selectedColorCombination={selectedColorCombination}
                editSelectedRows={editSelectedRows}
                deleteSelectedRows={() => deleteSelectedRows(parentRow.id)}
                renderSubTable={renderSubTable}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setSubTablePage}
                currentPage={subTablePage}
                isSubTable
            />
        );
    };

    return (
        <div className='bg-gray-50 p-5 rounded-lg'>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">React CRUD Table Components</h1>
            </div>
            <div className="flex mb-4 space-x-2">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border rounded" placeholder="Search..." />
                <button onClick={() => addRow()} className="flex bg-blue-500 text-white px-4 py-2 rounded">
                    <i className="mx-2 bi bi-plus-lg"></i> Add
                </button>
                <button onClick={() => editSelectedRows()} className="flex bg-yellow-500 text-white px-4 py-2 rounded">
                    <i className="mx-2 bi bi-pencil"></i> Edit
                </button>
                <button onClick={() => deleteSelectedRows()} className="flex bg-red-500 text-white px-4 py-2 rounded">
                    <i className="mx-2 bi bi-trash"></i> Delete
                </button>
                <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="border rounded px-4 py-2">
                    {[5, 10, 15, 20].map((number) => (
                        <option key={number} value={number}>{number} rows per page</option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedColorCombination(colorCombinations.find(combo => combo.id === Number(e.target.value)))} className="border rounded px-4 py-2">
                    {colorCombinations.map((combo) => (
                        <option key={combo.id} value={combo.id}>
                            Color {combo.id}
                        </option>
                    ))}
                </select>
            </div>
            <CrudTable
                columns={columns}
                data={tableData}
                addRow={addRow}
                toggleSubTable={toggleSubTable}
                handleSelectRow={handleSelectRow}
                selectedColorCombination={selectedColorCombination}
                editSelectedRows={editSelectedRows}
                deleteSelectedRows={deleteSelectedRows}
                renderSubTable={renderSubTable}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                isSubTable={false}
            />
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
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
