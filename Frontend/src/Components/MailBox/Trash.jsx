//frontend/src/Components/MailBox/Trash.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../styles/Trash.css';
import '../styles/SentBox.css';
import { fetchTrashEmails, untrashEmail, deleteEmail } from "../../redux/actions/mailActions";
import { TbTrashOff, TbTrash } from "react-icons/tb";

export const Trash = () => {
    const dispatch = useDispatch();
    const trashEmails = useSelector((state) => state.mail.trashEmails);
    const loading = useSelector((state) => state.mail.loading);
    const error = useSelector((state) => state.mail.error);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const usermail = userData ? userData.usermail : null;

        if (usermail) {
            dispatch(fetchTrashEmails(usermail));
        }
    }, [dispatch]);

    const handleUntrash = (emailId) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const usermail = userData ? userData.usermail : null;

        if (usermail) {
            dispatch(untrashEmail(usermail, emailId));
        }
    };

    const handleDelete = (emailId) => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const usermail = userData ? userData.usermail : null;

        if (usermail) {
            dispatch(deleteEmail(usermail, emailId));
        }
    };

    if (loading) return <p style={{textAlign: "center", fontSize: "14px"}}>Loading Trash Emails...</p>;
    if (error) return <p style={{textAlign: "center", fontSize: "14px"}}>Error: {error}</p>;

    return (
        <div>
            <div className="TRASH_DIV_HD2"><h2 className="TRASH_H2">Trash Section</h2></div>
            {trashEmails.length === 0 ? (
                <p style={{textAlign: "center", fontSize: "14px"}}>No emails in trash</p>
            ) : (
                trashEmails.map((email, index) => (
                    <div key={index} className="SNT_LIST">
                        <h3 className="LST_H3">{email.subject}</h3>
                        <div className="LST_SN_RE">
                            <h4 className="LST_H4">{email.sender}</h4>
                            <h4 className="LST_H4">{email.receiver}</h4>
                        </div>
                        <p className="LST_P">{email.message}</p>
                        <button className="DELBTN" onClick={() => handleUntrash(email._id)}><TbTrashOff color="white" size={20} /></button>
                        <button className="DELBTN" onClick={() => handleDelete(email._id)}><TbTrash color="white" size={20} /></button>
                    </div>
                ))
            )}
        </div>
    );
};
