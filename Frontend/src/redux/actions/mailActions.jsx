//frontend/src/redux/actions/mailActions.jsx
import {SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAILURE, RECEIVE_EMAILS_REQUEST, RECEIVE_EMAILS_SUCCESS, RECEIVE_EMAILS_FAILURE, STAR_EMAIL_SUCCESS, FETCH_STARRED_EMAILS_REQUEST, FETCH_STARRED_EMAILS_SUCCESS, FETCH_STARRED_EMAILS_FAILURE, UNSTAR_EMAIL_SUCCESS, FETCH_SENT_EMAILS_REQUEST, FETCH_SENT_EMAILS_SUCCESS, FETCH_SENT_EMAILS_FAILURE, MOVE_TO_TRASH_SUCCESS, FETCH_TRASH_EMAILS_REQUEST, FETCH_TRASH_EMAILS_SUCCESS, FETCH_TRASH_EMAILS_FAILURE, UNTRASH_EMAIL_SUCCESS, DELETE_EMAIL_REQUEST, DELETE_EMAIL_SUCCESS, DELETE_EMAIL_FAILURE, } from '../constants/mailConstants';
import axios from 'axios';

export const sendEmail = (emailData) => async (dispatch) => {
    dispatch({ type: SEND_EMAIL_REQUEST });

    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post('https://full-stack-project-03-aks.vercel.app/api/mail/send', emailData, config);
        dispatch({ type: SEND_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const fetchReceivedEmails = (usermail) => async (dispatch) => {
    dispatch({ type: RECEIVE_EMAILS_REQUEST });

    try {
        const response = await axios.get(`https://full-stack-project-03-aks.vercel.app/api/mail/receivebox/${usermail}`);
        dispatch({ type: RECEIVE_EMAILS_SUCCESS, payload: response.data });
        return response.data;
    } catch (error) {
        dispatch({
            type: RECEIVE_EMAILS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
        throw error;
    }
};

export const starEmail = (usermail, email) => async (dispatch) => {
    try {
        const response = await axios.post(`https://full-stack-project-03-aks.vercel.app/api/mail/star`, { usermail, email });
        dispatch({ type: STAR_EMAIL_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error starring email:', error);
    }
};

export const fetchStarredEmails = (usermail) => async (dispatch) => {
    dispatch({ type: FETCH_STARRED_EMAILS_REQUEST });

    try {
        const response = await axios.get(`https://full-stack-project-03-aks.vercel.app/api/mail/starbox/${usermail}`);
        dispatch({ type: FETCH_STARRED_EMAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_STARRED_EMAILS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const unStarEmail = (usermail, emailId) => async (dispatch) => {
    try {
        await axios.delete(`https://full-stack-project-03-aks.vercel.app/api/mail/star/${emailId}`, {
            data: { usermail },
        });
        dispatch({ type: UNSTAR_EMAIL_SUCCESS, payload: emailId });
        console.log('Email unstarred successfully');
    } catch (error) {
        console.error('Error unstarring email:', error);
    }
};

export const fetchSentEmails = (usermail) => async (dispatch) => {
    dispatch({ type: FETCH_SENT_EMAILS_REQUEST });

    try {
        const response = await axios.get(`https://full-stack-project-03-aks.vercel.app/api/mail/sentbox/${usermail}`);
        dispatch({ type: FETCH_SENT_EMAILS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching sent emails:', error);
        dispatch({
            type: FETCH_SENT_EMAILS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const moveToTrash = (usermail, emailId) => async (dispatch) => {
    try {
        const response = await axios.post('https://full-stack-project-03-aks.vercel.app/api/mail/trash', { usermail, emailId });
        dispatch({ type: MOVE_TO_TRASH_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error moving email to trash:', error);
    }
};

export const fetchTrashEmails = (usermail) => async (dispatch) => {
    dispatch({ type: FETCH_TRASH_EMAILS_REQUEST });

    try {
        const response = await axios.get(`https://full-stack-project-03-aks.vercel.app/api/mail/trashbox/${usermail}`);
        dispatch({ type: FETCH_TRASH_EMAILS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: FETCH_TRASH_EMAILS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const untrashEmail = (usermail, emailId) => async (dispatch) => {
    try {
        const { data } = await axios.post('https://full-stack-project-03-aks.vercel.app/api/mail/untrash', { usermail, emailId });
        dispatch({ type: UNTRASH_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error untrashing email:', error);
    }
};

export const deleteEmail = (usermail, emailId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EMAIL_REQUEST });
        await axios.delete(`https://full-stack-project-03-aks.vercel.app/api/mail/trash/${emailId}`, { data: { usermail } });
        dispatch({ type: DELETE_EMAIL_SUCCESS, payload: emailId });
    } catch (error) {
        dispatch({ type: DELETE_EMAIL_FAILURE, payload: error.message });
    }
};