// ✅ userActions.js
import axios from 'axios';
import { loginSuccess } from './userslice';

export const fetchUserData = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/user/profile/${username}`);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};
