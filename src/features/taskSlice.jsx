import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: false,
    adminDashboardDatas: null,
    allTasks: null,
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
        },
        getAllTasksSuccess: (state, { payload }) => {
            state.loading = false
            state.allTasks = payload
        },
    }
})

export const {
    fetchStart,
    fetchFail,
    getAdminDashboardDatasSuccess,
    getAllTasksSuccess
} = taskSlice.actions

export default taskSlice.reducer