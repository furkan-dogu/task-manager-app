import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: false,
    token: ""
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
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    loginSuccess
} = authSlice.actions

export default authSlice.reducer
