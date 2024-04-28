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

export const addNewProductAsync = createAsyncThunk(
  "product/add",
  async (payload) => {
    console.log("Input inside addNewProductAsync function : ", payload);

    // console.log(".........................");
    /* Making POST API Call to add the new todo */
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
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
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetMessage: (state, action) => {
      state.message = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = [...action.payload];
        state.loading = false;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      .addCase(addNewProductAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.message = "Product Added Successfully";
      })
      .addCase(addNewProductAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.error = "Unable To Add Product";
        state.loading = false;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

export const getProducts = (state) => state.product.products;
export const getLoading = (state) => state.product.loading;
export const getMessage = (state) => state.product.message;
export const getError = (state) => state.product.error;
