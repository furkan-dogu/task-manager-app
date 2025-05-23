import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: false,
    token: "",
    name: "",
    email: "",
    profileImageUrl: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
        loginSuccess: (state, { payload }) => {
            state.loading = false
            state.user = payload
            state.token = payload.token
            state.name = payload.name
            state.email = payload.email
            state.profileImageUrl = payload.profileImageUrl
        },
        registerSuccess: (state, { payload }) => {
            state.loading = false
            state.user = payload
            state.token = payload.token
            state.name = payload.name
            state.email = payload.email
            state.profileImageUrl = payload.profileImageUrl
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    loginSuccess,
    registerSuccess
} = authSlice.actions

export default authSlice.reducer
