// frontend/src/Components/MailBox/Compose.jsx
import React from "react";
import {useDispatch} from 'react-redux';
import {sendEmail} from '../../redux/actions/mailActions';
import '../styles/Compose.css';
export const Compose = () => {
    const dispatch = useDispatch();
    const SubmitHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        dispatch(sendEmail(formData));
        form.reset();
    }
    return (
        <>
            <div className="CM_HD_H1"><h1 className="CM_H1">Compose Section</h1></div>
            <div className="DIV_FRM_FORM">
                <form className="FRM_FORM_CM" onSubmit={SubmitHandler}>
                    <input className="FMR_IP" required type="text" placeholder="Enter Sender Name" id="sender" name="sender" />
                    <input className="FMR_IP" required type="text" placeholder="Enter Receiver Name" id="receiver" name="receiver" />
                    <input className="FMR_IP" required type="text" placeholder="Enter Subject" id="subject" name="subject" />
                    <textarea className="FRM_TXT" required placeholder="Enter Texts Here...." rows={16} cols={100} id="message" name="message" />
                    <input className="MAIL_SBMT" type="submit" value="Send Email" />
                </form>
            </div>
        </>
    );
}