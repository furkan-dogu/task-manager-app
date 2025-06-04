import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
    allUsers: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
        getAllUsersSuccess: (state, { payload }) => {
            state.loading = false
            state.allUsers = payload
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    getAllUsersSuccess
} = userSlice.actions

export default userSlice.reducer