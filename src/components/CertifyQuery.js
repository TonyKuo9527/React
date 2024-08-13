import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CertifyQuery = () => {
    const [rowData] = useState([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 },
    ]);

    const [columnDefs] = useState([
        {
            headerName: "Make",
            field: "make",
            sortable: true,
            filter: true,
            editable: true,
            cellEditor: "agLargeTextCellEditor",
            cellEditorPopup: true,
            cellEditorParams: {
                maxLength: 500,
                rows: 10,
                cols: 50,
                // 使用 popupParent 参数来创建一个 div 包含标题和文本框
                popupParent: document.body,
                cellEditorParams: (params) => {
                    const eDiv = document.createElement("div");
                    eDiv.style.padding = "10px";
                    eDiv.style.backgroundColor = "white";
                    eDiv.style.border = "1px solid #ccc";
                    eDiv.style.borderRadius = "4px";

                    const title = document.createElement("div");
                    title.innerText = "你的標題";
                    title.style.fontWeight = "bold";
                    title.style.marginBottom = "8px";
                    eDiv.appendChild(title);

                    const textarea = document.createElement("textarea");
                    textarea.style.width = "100%";
                    textarea.style.height = "150px";
                    textarea.value = params.value || "";
                    eDiv.appendChild(textarea);

                    // 将 textarea 的变化反映到单元格中
                    textarea.addEventListener("input", (event) => {
                        params.node.setDataValue(
                            params.column.getId(),
                            event.target.value,
                        );
                    });

                    return eDiv;
                },
            },
        },
        {
            headerName: "Model",
            field: "model",
            sortable: true,
            filter: true,
            editable: true,
        },
        {
            headerName: "Price",
            field: "price",
            sortable: true,
            filter: true,
            editable: true,
        },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ resizable: true }}
            />
        </div>
    );
};

export default CertifyQuery;
