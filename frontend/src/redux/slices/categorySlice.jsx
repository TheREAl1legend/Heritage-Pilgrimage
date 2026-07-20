// src/redux/slices/categorySlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../services/api";

/* =========================
   GET ALL CATEGORIES
========================= */

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",

  async (_, thunkAPI) => {
    try {
      const { data } = await API.get("/categories");

      return data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   GET SINGLE CATEGORY
========================= */

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",

  async (id, thunkAPI) => {
    try {
      const { data } = await API.get(`/categories/${id}`);

      return data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   CREATE CATEGORY
========================= */

export const createCategory = createAsyncThunk(
  "category/createCategory",

  async (categoryData, thunkAPI) => {
    try {
      const { data } = await API.post("/categories", categoryData);

      return data.category;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   UPDATE CATEGORY
========================= */

export const updateCategory = createAsyncThunk(
  "category/updateCategory",

  async ({ id, categoryData }, thunkAPI) => {
    try {
      const { data } = await API.put(`/categories/${id}`, categoryData);

      return data.updatedCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   DELETE CATEGORY
========================= */

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",

  async (id, thunkAPI) => {
    try {
      await API.delete(`/categories/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

/* =========================
   INITIAL STATE
========================= */

const initialState = {
  categories: [],

  category: null,

  loading: false,

  error: null,

  success: false,
};

/* =========================
   CATEGORY SLICE
========================= */

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },

    clearCategorySuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    /* =========================
         FETCH ALL
      ========================= */

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         FETCH SINGLE
      ========================= */

    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;

        state.category = action.payload;
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         CREATE
      ========================= */

    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.categories.unshift(action.payload);
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         UPDATE
      ========================= */

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category,
        );
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    /* =========================
         DELETE
      ========================= */

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */

export const {
  clearCategoryError,

  clearCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
