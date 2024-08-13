import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { useSelector, useDispatch } from 'react-redux';
import { setRowData } from '../store';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function Dashboard() {
    const dispatch = useDispatch();
    const storedRowData = useSelector(state => state.rowData);

    const [localRowData, setLocalRowData] = useState([]);
    const [editingEnabled, setEditingEnabled] = useState(false);

    useEffect(() => {
        const initializedData = storedRowData.map(row => ({
            ...row,
            field5: 'original'
        }));
        setLocalRowData(initializedData);
    }, [storedRowData]);

    const StatusCellRenderer = (params) => {
        const colorMap = {
            original: 'secondary',
            edit: 'primary',
            delete: 'danger',
            increase: 'warning',
        };
        return (
            <Badge bg={colorMap[params.value] || 'secondary'}>
                {params.value}
            </Badge>
        );
    };

    const Toolbar = (params) => {
        return (
            <div>
                <Button variant="danger" onClick={() => handleDelete(params.data)}><i className="bi bi-trash3"> </i></Button>{' '}
                <Button variant="success" onClick={() => handleSave(params.data)}><i className="bi bi-floppy"> </i></Button>{' '}
                <Button variant="secondary" onClick={() => handleReset(params.data)}><i className="bi bi-arrow-clockwise"> </i></Button>{' '}
            </div>
        );
    };

    const columnDefs = [
        { headerName: "field1", field: "field1" },
        { headerName: "field2", field: "field2" },
        { headerName: "field3", field: "field3" },
        { headerName: "field4", field: "field4" },
        { headerName: "field5", field: "field5", cellRenderer: StatusCellRenderer },
        ...(editingEnabled ? [{ headerName: "field6", field: "field6", cellRenderer: Toolbar }] : []),
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: editingEnabled,
    };

    const onCellValueChanged = (params) => {
        const fieldsToWatch = ['field1', 'field2', 'field3', 'field4'];
        const rowId = params.data.id;

        const currentRow = params.data;
        const originalRow = storedRowData.find(row => row.id === rowId);

        if (fieldsToWatch.includes(params.colDef.field)) {
            const hasChanged = fieldsToWatch.some(field => currentRow[field] !== originalRow[field]);
            currentRow.field5 = hasChanged ? 'edit' : 'original';

            const updatedLocalRowData = localRowData.map(row =>
                row.id === rowId ? { ...row, field5: currentRow.field5 } : row
            );
            setLocalRowData(updatedLocalRowData);
        }
    };

    const handleDelete = (rowData) => {
        const updatedRowData = storedRowData.filter(row => row.id !== rowData.id);
        dispatch(setRowData(updatedRowData));
    };

    const handleSave = (rowData) => {
        const updatedRowData = storedRowData.map(row =>
            row.id === rowData.id ? { ...rowData } : row
        );
        dispatch(setRowData(updatedRowData));
    };

    const handleReset = (rowData) => {
        const originalRowData = storedRowData.find(row => row.id === rowData.id);
        if (originalRowData) {
            const updatedLocalRowData = localRowData.map(row =>
                row.id === rowData.id ? { ...originalRowData, field5: 'original' } : row
            );
            setLocalRowData(updatedLocalRowData);
        }
    };

    const handleAddNew = () => {
        const newRow = {
            id: localRowData.length + 1, // 確保每行有一個唯一的ID
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: 'increase',
            field6: ''
        };
        setLocalRowData([newRow, ...localRowData]);
    };

    const toggleEditing = () => setEditingEnabled(prev => !prev);

    return (
        <Row>
            <Col className="text-end">
                {editingEnabled && (
                    <Button variant="success" onClick={handleAddNew}>
                        <i className="bi bi-plus-circle"> </i>
                    </Button>
                )}
                <Button variant="primary" onClick={toggleEditing}>
                    <i className={editingEnabled ? "bi bi-x-square" : "bi bi-pencil-square"}> </i>{' '}
                </Button>
            </Col>
            <div className="table-container">
                <div className="grid-container ag-theme-alpine">
                    <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowData={localRowData}
                        onCellValueChanged={onCellValueChanged}
                    />
                </div>
            </div>
        </Row>
    );
}

export default Dashboard;
