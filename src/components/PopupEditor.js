import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PopupEditor = (props) => {
    const [value, setValue] = useState(props.value || "");
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.stopEditing(); // 觸發 AG Grid 停止編輯
    };

    const handleSave = () => {
        props.node.setDataValue(props.column.colId, value); // 更新單元格數據
        handleClose(); // 關閉彈出窗口
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>編輯內容</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    關閉
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    保存變更
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopupEditor;
