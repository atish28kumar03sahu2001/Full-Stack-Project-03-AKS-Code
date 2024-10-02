//frontend/src/Components/MailBox/Inbox.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from "react-router-dom";
import { fetchReceivedEmails, starEmail, fetchStarredEmails, unStarEmail, moveToTrash } from '../../redux/actions/mailActions'; 
import { FaEye, FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import "../styles/Inbox.css";
import { Message } from "../Pages/Message";

export const Inbox = () => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [hiddenStarEmails, setHiddenStarEmails] = useState([]);
    const [localStarredEmails, setLocalStarredEmails] = useState([]);
    const [localReceivedEmails, setLocalReceivedEmails] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { receivedEmails = [], starredEmails = [], loading, error } = useSelector(state => state.mail);
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    const userEmail = storedUser ? storedUser.usermail : '';

    useEffect(() => {
        if (userEmail) {
            dispatch(fetchReceivedEmails(userEmail));
            dispatch(fetchStarredEmails(userEmail));
        }
    }, [dispatch, userEmail]);

    useEffect(() => {
        setLocalStarredEmails(starredEmails || []);
    }, [starredEmails]);

    useEffect(() => {
        setLocalReceivedEmails(receivedEmails);
    }, [receivedEmails]);

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleCloseModal = () => {
        setSelectedMessage(null);
    };

    const handleStarEmail = async (email) => {
        try {
            await dispatch(starEmail(userEmail, email));
            setLocalStarredEmails(prev => [...prev, email]);
            setHiddenStarEmails(prev => [...prev, email._id]);
            navigate(`/user/${storedUser._id}/star`);
        } catch (error) {
            console.error('Error starring email:', error);
        }
    };

    const handleUnstarEmail = async (email) => {
        try {
            await dispatch(unStarEmail(userEmail, email));
            setLocalStarredEmails(prev => prev.filter(starredEmail => starredEmail._id !== email._id));
            setHiddenStarEmails(prev => prev.filter(id => id !== email._id));
        } catch (error) {
            console.error('Error unstarring email:', error);
        }
    };

    const isEmailStarred = (email) => {
        return localStarredEmails.some((starredEmail) => starredEmail._id === email._id);
    };

    const handleMoveToTrash = async (email) => {
        try {
            await dispatch(moveToTrash(userEmail, email._id));
            setLocalReceivedEmails(prev => prev.filter(receivedEmail => receivedEmail._id !== email._id));
            navigate(`/user/${storedUser._id}/trash`);
        } catch (error) {
            console.error('Error moving email to trash:', error);
        }
    };

    const isStarButtonHidden = (emailId) => {
        return hiddenStarEmails.includes(emailId);
    };

    if (loading) {
        return <div style={{textAlign: "center", fontSize: "14px"}}>Loading...</div>;
    }

    if (error) {
        return <div style={{textAlign: "center", fontSize: "14px"}}>Error: {error}</div>;
    }

    return (
        <>
            <div className="IB_DIV_H2"><h2 className="IB_DIV_H2">Inbox Section</h2></div>
            {localReceivedEmails.length > 0 ? (
                <div className="IB_DIV_TBL">
                    {localReceivedEmails.map((email) => (
                        <div key={`${email._id}-${email.timestamp}`} className="IB_DIV_LST">
                            <p className="IB_DIV_LST_EM">{email.subject}</p>
                            <button className="VIEW_BTN" onClick={() => handleViewMessage(email)}><FaEye size={20} /></button>

                            <button
                                className="VIEW_BTN"
                                disabled={isEmailStarred(email)}
                                onClick={()=>{
                                    if(isEmailStarred(email)) {
                                        window.location.reload();
                                    } else {
                                        handleStarEmail(email);
                                    }
                                }}
                            >
                                {isEmailStarred(email) ? <FaStar size={20} /> : <FaRegStar size={20} />}
                            </button>

                            <button className="VIEW_BTN" onClick={() => handleMoveToTrash(email)}><FaTrash size={20} /></button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{textAlign: "center", fontSize: "14px"}}>No messages found.</p>
            )}
            {selectedMessage && <Message MessageData={selectedMessage} onClose={handleCloseModal} />}
        </>
    );
};