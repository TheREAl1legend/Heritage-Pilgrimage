import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/api";

/* =========================
   REGISTER USER
========================= */

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, thunkAPI) => {
    try {
      const response = await API.post(`/auth/register`, userData);

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration Failed!");
    }
  },
);

/* =========================
   LOGIN USER
========================= */

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const response = await API.post(`auth/login`, userData);

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  },
);

/* =========================
   INITIAL STATE
========================= */

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo,

  loading: false,

  error: null,

  success: false,
};

/* =========================
   SLICE
========================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.userInfo = null;

      localStorage.removeItem("userInfo");
    },

    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* REGISTER */

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.userInfo = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* LOGIN */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.userInfo = action.payload;

        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
