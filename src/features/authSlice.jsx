import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: false,
    token: "",
    userInfo: null
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
        },
        registerSuccess: (state, { payload }) => {
            state.loading = false
            state.user = payload
            state.token = payload.token
        },
        logoutSuccess: (state) => {
            state.loading = false
            state.user = null
            state.token = ""
        },
        getUserInfoSuccess: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.user = { ...state.user, ...payload };
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    loginSuccess,
    registerSuccess,
    logoutSuccess,
    getUserInfoSuccess
} = authSlice.actions

export default authSlice.reducer
