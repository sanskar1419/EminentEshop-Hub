/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for products */
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
    const response = await fetch(
      "https://e-commerce-server-815s.onrender.com/products"
    );
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating a addNewProductAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const addNewProductAsync = createAsyncThunk(
  "product/add",
  async (payload) => {
    /* Making POST API Call to add the new product */
    const response = await fetch(
      "https://e-commerce-server-815s.onrender.com/products",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating a deleteProductAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const deleteProductAsync = createAsyncThunk(
  "product/delete",
  async (payload, thunkAPI) => {
    /* Making DELETE API Call to */
    const response = await fetch(
      `https://e-commerce-server-815s.onrender.com/products/${payload}`,
      {
        method: "DELETE",
      }
    );
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating a updateProductAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (payload, thunkAPI) => {
    /* Making PUT API Call to */
    const response = await fetch(
      `https://e-commerce-server-815s.onrender.com/products/${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          rating: payload.rating,
          mrp: payload.mrp,
          price: payload.price,
          Brand: payload.Brand,
          Review: payload.Review,
          image: [...payload.image],
          type: payload.type,
          details: payload.details,
          description: [...payload.description],
          additional: payload.additional,
        }),
      }
    );
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating productSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
const productSlice = createSlice({
  /* Slice Name */
  name: "product",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
  reducers: {
    /* Reducer key and value function to set the loading state to true */
    fetchStart: (state, action) => {
      state.loading = true;
    },
    /* Reducer key and value function to set the error and loading state as false */
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    /* Reducer key and value function to set the message state to null */
    resetMessage: (state, action) => {
      state.message = null;
    },
    /* Reducer key and value function to set the error state to null */
    resetError: (state, action) => {
      state.error = null;
    },
  },
  /* Object of extraReducer function */
  /* A "builder callback" function used to add more reducers */
  extraReducers: (builder) => {
    builder
      /* When getAllProductsAsync promise is fulfilled setting the products */
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.products = [...action.payload];
        state.loading = false;
      })
      /* When getAllProductsAsync promise is rejected setting the error */
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      /* When addNewProductAsync promise is fulfilled updating the product array */
      .addCase(addNewProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.message = "Product Added Successfully";
      })
      /* When addNewProductAsync promise is rejected setting the error */
      .addCase(addNewProductAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.error = "Unable To Add Product";
        state.loading = false;
      })
      /* When deleteProductAsync promise is fulfilled updating the product array */
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        const productIndex = state.products.findIndex(
          (p) => action.payload.id === p.id
        );
        state.products.splice(productIndex, 1);
        state.message = `🙌🙌 Product(${action.payload.title}) has been deleted successfully`;
        state.loading = false;
      })
      /* When deleteProductAsync promise is rejected setting the error */
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.error = `😔😔 Unable to delete product(${action.payload.title})`;
        state.loading = false;
      })
      /* When updateProductAsync promise is fulfilled updating the product array */
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = `Product(${action.payload.title}) Updated Successfully`;
      })
      /* When updateProductAsync promise is rejected setting the error */
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.error = "Unable To Add Product";
        state.loading = false;
      });
  },
});

/* Creating and exporting productReducer using slice reducer method */
export const productReducer = productSlice.reducer;
/* Creating and exporting productActions using slice actions method */
export const productActions = productSlice.actions;

/* Selector function to get data */
export const getProducts = (state) => state.product.products;
export const getLoading = (state) => state.product.loading;
export const getMessage = (state) => state.product.message;
export const getError = (state) => state.product.error;
