//frontend/src/Components/Pages/Message.jsx
import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import ReactDOM from "react-dom";
import "../styles/Message.css";
export const Message = ({MessageData, onClose}) => {
    return ReactDOM.createPortal(
        <>
            <div className="MSG_CONTAINER">
                <div>
                    <div className="CLS_BTN_DIV"><button className="CLS_BTN" onClick={onClose}><IoCloseCircle color="red" size={30} /></button></div>
                    <div className="SEND_DIV"><p className="SEND_MSG">{MessageData.sender}</p></div>
                    <div className="SEND_DIV"><p className="SEND_MSG">{MessageData.receiver}</p></div>
                    <p className="MSG_P">{MessageData.subject}</p>
                    <p className="MSG_P">{MessageData.message}</p>
                </div>
            </div>
        </>, document.getElementById("root1")
    );
}