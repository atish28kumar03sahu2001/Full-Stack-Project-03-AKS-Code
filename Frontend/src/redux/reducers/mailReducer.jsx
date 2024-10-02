//frontend/src/redux/reducers/mailReducer.jsx;
import {SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAILURE, RECEIVE_EMAILS_REQUEST, RECEIVE_EMAILS_SUCCESS, RECEIVE_EMAILS_FAILURE, STAR_EMAIL_SUCCESS, FETCH_STARRED_EMAILS_REQUEST, FETCH_STARRED_EMAILS_SUCCESS, FETCH_STARRED_EMAILS_FAILURE, UNSTAR_EMAIL_SUCCESS, FETCH_SENT_EMAILS_REQUEST, FETCH_SENT_EMAILS_SUCCESS, FETCH_SENT_EMAILS_FAILURE, MOVE_TO_TRASH_SUCCESS, FETCH_TRASH_EMAILS_REQUEST, FETCH_TRASH_EMAILS_SUCCESS, FETCH_TRASH_EMAILS_FAILURE, UNTRASH_EMAIL_SUCCESS, DELETE_EMAIL_REQUEST, DELETE_EMAIL_SUCCESS, DELETE_EMAIL_FAILURE, } from '../constants/mailConstants';
const initialState = {
    loading: false,
    success: false,
    error: null,
    receivedEmails: [],
    starredEmails: [],
    sentEmails: [],
    trashEmails: [],
};

export const mailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return { ...state, loading: true, success: false, error: null };
        case SEND_EMAIL_SUCCESS:
            return { ...state, loading: false, success: true, error: null };
        case SEND_EMAIL_FAILURE:
            return { ...state, loading: false, success: false, error: action.payload };
        case RECEIVE_EMAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case RECEIVE_EMAILS_SUCCESS:
            return { ...state, loading: false, receivedEmails: action.payload, error: null };
        case RECEIVE_EMAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case STAR_EMAIL_SUCCESS:
            return { ...state, starredEmails: [...state.starredEmails, action.payload] };
        case FETCH_STARRED_EMAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_STARRED_EMAILS_SUCCESS:
            return { ...state, loading: false, starredEmails: action.payload, error: null };
        case FETCH_STARRED_EMAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UNSTAR_EMAIL_SUCCESS: 
            return {...state, starredEmails: state.starredEmails.filter(email => email._id !== action.payload),}
        case FETCH_SENT_EMAILS_REQUEST:
            return { ...state, loading: true };
        case FETCH_SENT_EMAILS_SUCCESS: 
            return { ...state, loading: false, sentEmails: action.payload };
        case FETCH_SENT_EMAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case MOVE_TO_TRASH_SUCCESS: 
            return { ...state, trashEmails: [...state.trashEmails, action.payload], receivedEmails: state.receivedEmails.filter(email => email._id !== action.payload._id), }
        case FETCH_TRASH_EMAILS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_TRASH_EMAILS_SUCCESS:
            return { ...state, loading: false, trashEmails: action.payload, error: null };
        case FETCH_TRASH_EMAILS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UNTRASH_EMAIL_SUCCESS : 
            return {...state, trashEmails: state.trashEmails.filter(email => email._id !== action.payload._id), receivedEmails: [...state.receivedEmails, action.payload], }
        case DELETE_EMAIL_REQUEST:
            return { ...state, loading: true };
        case DELETE_EMAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_EMAIL_SUCCESS:
            return {...state, loading: false, trashEmails: state.trashEmails.filter(email => email._id !== action.payload),}
        default:
            return state;
    }
};
