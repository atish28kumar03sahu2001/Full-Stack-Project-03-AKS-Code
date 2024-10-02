//frontend/src/redux/reducers/authReducer.jsx
import {SIGNUP_SUCCESS, SIGNUP_FAIL, SIGNIN_SUCCESS, SIGNIN_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL  } from '../constants/authConstants';

const initialState = {user: null, error: null};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return { ...state, user: action.payload, error: null };
        case SIGNUP_FAIL:
            return { ...state, error: action.payload };
        case SIGNIN_SUCCESS:
            return { ...state, user: action.payload.user, error: null };
        case SIGNIN_FAIL:
            return { ...state, user: null, error: action.payload };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, user: action.payload, error: null };
        case UPDATE_PROFILE_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};