import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuthenticated: false,
};

const userslice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            console.log('User  logged in:', state.user); // Log when user logs in
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            console.log('User  logged out'); // Log when user logs out
        },
        signup: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            console.log('User  signed up:', state.user); // Log when user signs up
        },
        updateprofile: (state, action) => {
            // Merge the updated fields into current user object
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,  // Ensure that all fields (like Phone_Number) are in the payload
                };
                console.log('User profile updated:', state.user);
            } else {
                console.warn('No user found in state to update');
            }
        },
        AddAddress: (state, action) => {
            if (!Array.isArray(state.user.Address)) {
                state.user.Address = []; // Ensure it's an array
            }
            state.user.Address.push(action.payload);
            console.log('address added:', state.user);
        },
        DeleteAddress: (state, action) => {
            // Remove address by ID or index
            state.user.Address = state.user.Address.filter(addr => addr.id !== action.payload);
        },
        updateAddress: (state, action) => {
            const index = state.user.Address.findIndex(addr => addr.id === action.payload.id);
            if (index !== -1) {
                state.user.Address[index] = action.payload;
            }
        },


    }
});

export const { loginSuccess, logout, signup, updateprofile, AddAddress, DeleteAddress, updateAddress } = userslice.actions;
export default userslice.reducer;


