import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  message: null,
  error: null,
};

/* Creating a getAllProductsAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const getAllProductsAsync = createAsyncThunk(
  "product/getAll",
  async () => {
    /* Making the GET API Call to get products array */
    const response = await fetch("http://localhost:3000/products");
    /* Returning the promise */
    return await response.json();
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      state.products = [...action.payload];
      state.loading = false;
    });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export const getProducts = (state) => state.product.products;
