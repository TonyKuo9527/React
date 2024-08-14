import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

let storeRowData = [
    { id: 1, field1: "AAA", field2: "Y", field3: '2024-08-14', field4: 'Item 1, Item 2, Item 3' },
    { id: 2, field1: "BBB", field2: "N", field3: '2024-08-15', field4: 'Item 1, Item 2, Item 3' },
    { id: 3, field1: "CCC", field2: "N", field3: '2024-08-16', field4: 'Item 1, Item 2, Item 3' }
]

function Dashboard() {
    const gridRef = useRef();

    const [localRowData, setLocalRowData] = useState([]);

    const [editingEnabled, setEditingEnabled] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            const initializedData = storeRowData.map((row) => ({
                ...row,
                field5: "ORIGINAL",
            }));
            setLocalRowData(initializedData);
            isFirstRender.current = false;
        }
    }, []);

    const StatusCellRenderer = (params) => {
        const colorMap = {
            ORIGINAL: "primary",
            MODIFIED: "warning",
            DELETE: "danger",
            INVALID: "secondary",
        };
        return (
            <div className="table-tools-div">
                <Badge bg={colorMap[params.value] || "secondary"}>
                    {params.value}
                </Badge>
            </div>
        );
    };

    const Toolbar = (params) => {
        const status = params.data.field5;

        return (
            <div className="table-tools-div">
                <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(params.data)}
                    disabled={status === "DELETE"}
                >
                    <i className="bi bi-trash3"> </i>
                </Button>{" "}
                <Button
                    variant="outline-success"
                    onClick={() => handleSave(params.data)}
                    disabled={status === "ORIGINAL"}
                >
                    <i className="bi bi-floppy"> </i>
                </Button>{" "}
                <Button
                    variant="outline-secondary"
                    onClick={() => handleReset(params.data)}
                    disabled={status === "ORIGINAL" || status === "INVALID"}
                >
                    <i className="bi bi-arrow-clockwise"> </i>
                </Button>{" "}
            </div>
        );
    };

    const ListButtonRenderer = (props) => {
        const handleClick = (event) => {
            event.stopPropagation();
            const rowIndex = props.node.rowIndex;
    
            if (rowIndex !== undefined) {
                props.api.startEditingCell({
                    rowIndex: rowIndex,
                    colKey: props.column.colId,
                });
            }
        };
    
        return (
            <div className="table-tools-div">
                <Button
                    onClick={handleClick}
                    style={{ width: '100%', height: 'auto' }}
                >
                    LIST
                </Button>
            </div>
        )
    };

    const columnDefs = [
        { headerName: "文字", field: "field1", headerClass: 'ag-header-center' },
        { 
            headerName: "選項", 
            field: "field2",
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['Y', 'N'],
            }
        },
        { 
            headerName: "日期",
            field: "field3",
            cellEditor: 'agDateCellEditor',
            cellEditorParams: {
                minValidYear: 2020,
                maxValidYear: 2030,
                popup: true, // 在彈出框中顯示日期選擇器
            },
            valueParser: (params) => {
                // 解析選擇的日期，並轉換為所需的格式
                const newValue = params.newValue;
                const parsedDate = new Date(newValue);
                return isNaN(parsedDate.getTime()) ? params.oldValue : parsedDate.toISOString().split('T')[0];
            },
            valueFormatter: (params) => {
                // 格式化顯示的日期
                const date = new Date(params.value);
                return isNaN(date.getTime()) ? params.value : date.toLocaleDateString('en-CA');
            }
        },
        { 
            headerName: "列表",
            field: "field4",
            cellRenderer: ListButtonRenderer,
            cellEditorPopup: true,
            cellEditor: 'agLargeTextCellEditor',
            cellEditorParams: {
                maxLength: 500, // 設置最多可編輯的字符數
                rows: 10, // 彈出編輯器中顯示的行數
                cols: 50, // 彈出編輯器中顯示的列數
            },
            onCellClicked: (params) => {
                // 阻止在按鈕之外的區域觸發編輯模式
                const clickedElement = params.event.target;
                if (clickedElement.tagName !== 'BUTTON') {
                    params.api.stopEditing(); // 停止編輯
                }
            },
        },
        {
            headerName: "狀態",
            field: "field5",
            cellRenderer: StatusCellRenderer,
            editable: false,
        },
        ...(editingEnabled
            ? [
                    {
                        headerName: "工具列",
                        field: "field6",
                        cellRenderer: Toolbar,
                        sortable: false,
                        filter: false,
                        editable: false,
                    },
                ]
            : []),
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        editable: editingEnabled,
    };

    const onCellValueChanged = (params) => {
        if (params.data.field5 === "INVALID") {
            return;
        }

        const fieldsToWatch = ["field1", "field2", "field3", "field4"];
        const rowId = params.data.id;

        const currentRow = localRowData.find((row) => row.id === rowId);
        const originalRow = storeRowData.find((row) => row.id === rowId);

        const hasChanged = fieldsToWatch.some((field) => {
            const currentValue = currentRow[field];
            const originalValue = originalRow[field];
        
            if (typeof currentValue === 'string' && !isNaN(currentValue)) {
                return parseFloat(currentValue) !== originalValue;
            } else if (typeof originalValue === 'string' && !isNaN(originalValue)) {
                return parseFloat(originalValue) !== currentValue;
            } else {
                return currentValue !== originalValue;
            }
        });

        currentRow.field5 = hasChanged ? "MODIFIED" : "ORIGINAL";

        setLocalRowData((prevData) =>
            prevData.map((row) =>
                row.id === rowId ? { ...currentRow, field5: currentRow.field5 } : row,
            ),
        );
    };

    const handleDelete = (rowData) => {
        const rowId = rowData.id;

        setLocalRowData((prevData) =>
            prevData.map((row) =>
                row.id === rowId ? { ...row, field5: "DELETE" } : row,
            ),
        );
    };

    const handleSave = (rowData) => {
        const rowId = rowData.id;

        if (rowData.field5 === "MODIFIED") {
            storeRowData = storeRowData.map((row) =>
                row.id === rowId ? { ...rowData} : row,
            );

            setLocalRowData((prevData) =>
                prevData.map((row) =>
                    row.id === rowId ? { ...rowData, field5: "ORIGINAL" } : row,
                ),
            );
        } else if (rowData.field5 === "DELETE") {
            storeRowData = storeRowData.filter((row) => row.id !== rowId);
            setLocalRowData((prevData) =>
                prevData.filter((row) => row.id !== rowId),
            );
        } else if (rowData.field5 === "INVALID") {
            const isField1Valid = rowData.field1 !== ""; // 替換成具體的檢查邏輯
            const isField2Valid = rowData.field2 !== ""; // 替換成具體的檢查邏輯
            const isField3Valid = rowData.field3 !== ""; // 替換成具體的檢查邏輯
            const isField4Valid = rowData.field4 !== ""; // 替換成具體的檢查邏輯

            if (
                isField1Valid &&
                isField2Valid &&
                isField3Valid &&
                isField4Valid
            ) {
                storeRowData.push({ ...rowData, field5: "ORIGINAL" });
                setLocalRowData((prevData) =>
                    prevData.map((row) =>
                        row.id === rowId ? { ...rowData, field5: "ORIGINAL" } : row,
                    ),
                );
            } else {
                alert("請確保所有欄位都已正確填寫後再保存。");
            }
        }
    };

    const handleReset = (rowData) => {
        const rowId = rowData.id;

        const originalRowData = storeRowData.find((row) => row.id === rowId);

        if (originalRowData) {
            setLocalRowData((prevData) =>
                prevData.map((row) =>
                    row.id === rowId
                        ? { ...originalRowData, field5: "ORIGINAL" }
                        : row,
                ),
            );
        } else if (rowData.field5 === "DELETE" && !originalRowData) {
            const hasInvalidRow = localRowData.some((row) => row.field5 === "INVALID");

            if (hasInvalidRow) {
                alert("一次僅允許新增一筆資料，請先保存當前資料。");
                return;
            }
            
            setLocalRowData((prevData) =>
                prevData.map((row) =>
                    row.id === rowId ? { ...rowData, field5: "INVALID" } : row,
                ),
            );
        }
    };

    const handleAdd = () => {
        const hasInvalidRow = localRowData.some((row) => row.field5 === "INVALID");

        if (hasInvalidRow) {
            alert("請先保存當前資料，然後再新增一筆新資料。");
            return;
        }

        const newRow = {
            id: Date.now(),
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            field5: "INVALID",
        };
        setLocalRowData([newRow, ...localRowData]);
    };

    const allSave = () => {
        let updatedData = [...localRowData];

        updatedData = updatedData.filter((row) => row.field5 !== "DELETE");

        updatedData = updatedData.map((row) =>
            row.field5 === "INVALID" || row.field5 === "MODIFIED"
                ? { ...row, field5: "ORIGINAL" }
                : row,
        );

        // 更新 Store
        storeRowData = updatedData.map(row => ({ ...row }));
        setLocalRowData(updatedData);
    };

    const toggleEditing = () => setEditingEnabled((prev) => !prev);

    const handleClearFilters = () => {
        gridRef.current.api.setFilterModel(null); // 清除所有篩選器
    };

    return (
        <Row>
            <Col className="text-end">
                <Button variant="outline-dark" onClick={handleClearFilters}>
                    <i class="bi bi-funnel-fill"></i>
                </Button>
                {editingEnabled && (
                    <Button variant="outline-dark" onClick={handleAdd}>
                        <i class="bi bi-plus-lg"></i>
                    </Button>
                )}
                {editingEnabled && (
                    <Button variant="outline-dark" onClick={allSave}>
                        <i class="bi bi-floppy-fill"></i>
                    </Button>
                )}
                <Button
                    variant={editingEnabled ? "outline-danger" : "outline-dark"}
                    onClick={toggleEditing}
                >
                    <i
                        className={
                            editingEnabled
                                ? "bi bi-x-lg"
                                : "bi bi-pencil-square"
                        }
                    >
                        {" "}
                    </i>{" "}
                </Button>
            </Col>
            <div className="table-container">
                <div className="grid-container ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
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
