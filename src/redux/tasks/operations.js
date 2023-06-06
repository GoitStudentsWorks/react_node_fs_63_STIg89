import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`api/tasks?month=7`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchTask = createAsyncThunk(
  'tasks/patchTask',
  async ({ id, task }, thunkAPI) => {
    try {
      const response = await axios.patch(`api/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, thunkAPI) => {
    console.log(task);
    try {
      const response = await axios.post('api/tasks', task);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
