import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
    adminDashboardDatas: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
        getAdminDashboardDatasSuccess: (state, { payload }) => {
            state.loading = false
            state.adminDashboardDatas = payload
        }
    }
})

export const {
    fetchStart,
    fetchFail,
    getAdminDashboardDatasSuccess
} = taskSlice.actions

export default taskSlice.reducer