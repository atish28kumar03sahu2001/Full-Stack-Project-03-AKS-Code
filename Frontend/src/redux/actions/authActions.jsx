//frontend/src/redux/actions/authActions.jsx
import axios from 'axios';
import {SIGNUP_SUCCESS, SIGNUP_FAIL, SIGNIN_SUCCESS, SIGNIN_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from '../constants/authConstants';

export const signupUser = (formData, navigate) => async (dispatch) => {
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post('http://localhost:8081/api/auth/signup', formData, config);
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
        navigate('/signin');
    } catch (error) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "User already exists. Please sign in.") {
            alert("User already exists. Please try signing in with a different email.");
        } else {
            alert("Signup failed: " + errorMessage);
        }
        dispatch({ type: SIGNUP_FAIL, payload: errorMessage });
    }
};

export const signinUser = (formData, navigate) => async (dispatch) => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post('http://localhost:8081/api/auth/signin', formData, config);
        dispatch({ type: SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate(`/user/${data.user._id}`);
    } catch (error) {
        dispatch({ type: SIGNIN_FAIL, payload: error.response.data.message });
    }
};

export const updateUserProfile = (formData, userId) => async (dispatch) => {
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.patch(`http://localhost:8081/api/user/${userId}`, formData, config);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
        return data;
    } catch (error) {
        const errorMessage = error.response.data.message;
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: errorMessage });
        alert("Profile update failed: " + errorMessage);
    }
};
