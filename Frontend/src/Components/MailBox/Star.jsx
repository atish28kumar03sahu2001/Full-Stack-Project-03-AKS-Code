//frontend/src/Components/MailBox/Star.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaRegStar } from "react-icons/fa";
import { fetchStarredEmails, unStarEmail } from "../../redux/actions/mailActions";
import "../styles/Star.css";
import "../styles/Inbox.css";
import { Message } from "../Pages/Message";

export const Star = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const dispatch = useDispatch();
    const { starredEmails, loading, error } = useSelector((state) => state.mail);
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    const userEmail = storedUser ? storedUser.usermail : '';

    useEffect(() => {
        if (userEmail) {
            dispatch(fetchStarredEmails(userEmail));
        }
    }, [dispatch, userEmail]);

    const handleUnstar = (emailId) => {
        dispatch(unStarEmail(userEmail, emailId));
    };

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleCloseModal = () => {
        setSelectedMessage(null);
    };

    if (loading) return <p style={{textAlign: "center", fontSize: "14px"}}>Loading...</p>;
    if (error) return <p style={{textAlign: "center", fontSize: "14px"}}>Error: {error}</p>;

    return (
        <>
            <div className="STR_DIV_HD"><h1 className="STR_DIV_H1">Starred Emails</h1></div>
            {starredEmails.length > 0 ? (
                <div className="STR_MAIL_DIV_LST">
                    {starredEmails.map((email, index) => (
                        <div key={email._id || index} className="STR_MAIL_LST">
                            <p className="STR_MSG">{email.subject}</p>
                            <button className="VIEW_BTN" onClick={() => handleViewMessage(email)}><FaEye size={20} /></button>
                            <button className="VIEW_BTN" onClick={() => handleUnstar(email._id)}><FaRegStar size={20} /></button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{textAlign: "center", fontSize: "14px"}}>No starred emails</p>
            )}
            {selectedMessage && <Message MessageData={selectedMessage} onClose={handleCloseModal} />}
        </>
    );
}
