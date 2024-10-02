//frontend/src/Components/MailBox/SentBox.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentEmails } from "../../redux/actions/mailActions";
import "../styles/SentBox.css";

export const SentBox = () => {
    const dispatch = useDispatch();
    const sentEmails = useSelector((state) => state.mail.sentEmails);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
    
        if (storedUser && storedUser.usermail) {
            dispatch(fetchSentEmails(storedUser.usermail));
        } else {
            console.log('User or usermail is missing in localStorage');
        }
    }, [dispatch]);
    
    return (
        <>
            <div className="SNT_DIV_HD2"><h2 className="SNT_DIV_H2">SentBox Section</h2></div>
            <div className="SNT_DIV_LST">
                {sentEmails && sentEmails.length > 0 ? (
                    sentEmails.map((email) => (
                        <div key={email._id} className="SNT_LIST">
                            <h3 className="LST_H3">{email.subject}</h3>
                            <div className="LST_SN_RE">
                                <h4 className="LST_H4">{email.sender}</h4>
                                <h4 className="LST_H4">{email.receiver}</h4>
                            </div>
                            <p className="LST_P">{email.message}</p>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: "center", fontSize: "14px"}}>No sent emails available.</p>
                )}
            </div>
        </>
    );
};
