import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('userData', JSON.stringify(data.userData.user));
      return data.userData.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ userName, email, password }, { rejectWithValue }) => {
    console.log(userName, email, password);
    try {
      const { data } = await axios.post('http://localhost:5000/auth/register', {
        userName,
        email,
        password,
      });
      localStorage.setItem('userData', JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('userData');
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
