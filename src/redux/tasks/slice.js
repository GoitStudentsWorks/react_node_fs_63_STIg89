import { createSlice } from '@reduxjs/toolkit';
import { addTask, deleteTask, fetchTasks, patchTask } from './operations';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], isLoading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(patchTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(patchTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.map(task =>
          task._id === payload._id ? payload : task
        );
      })
      .addCase(patchTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteTask.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(task => task._id !== payload._id);
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addTask.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.tasks.push(payload);
      })
      .addCase(addTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const tasksSliceReducer = tasksSlice.reducer;
