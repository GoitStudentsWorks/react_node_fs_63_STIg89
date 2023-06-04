import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'http://localhost:4000';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post('/api/auth/registration', user);
      Notify.success(
        'You are successfully registered! Verification send to your e-mail',
        {
          timeout: 8000,
          fontSize: '22px',
          position: 'center-center',
          cssAnimationStyle: 'zoom',
        }
      );
      return data;
    } catch (error) {
      Notify.failure('Please check your email and password and try again');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const { data } = await axios.post('/api/auth/login', user);
    console.log(data.token);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    Notify.failure('Please check your email and password and try again');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/api/auth/current');
      console.log('res:', res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
