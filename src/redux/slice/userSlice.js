/* Importing necessary function and method */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* Defining the InitialState for user */
const initialState = {
  name: "",
  userName: "",
  cart: [],
  loading: false,
  message: null,
  error: null,
};

/* Creating a getUserAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const getUserAsync = createAsyncThunk("user/get", async () => {
  /* Making the GET API Call to get user data */
  const response = await fetch(
    "https://e-commerce-server-815s.onrender.com/user"
  );
  /* Returning the promise */
  return await response.json();
});

/* Creating a updateUserAsync function that accepts a Redux action type string and a callback function that is return a promise. */
export const updateUserAsync = createAsyncThunk(
  "user/update",
  /* Making PUT API Call to */
  async (payload) => {
    const response = await fetch(
      "https://e-commerce-server-815s.onrender.com/user",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    /* Returning the promise */
    return await response.json();
  }
);

/* Creating userSlice function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state. */
const userSlice = createSlice({
  /* Slice Name */
  name: "user",
  /* Initial State */
  initialState,
  /* Object of Reducers Function */
  reducers: {
    /* Reducer key and value function to set the message state to null */
    resetMessage: (state, action) => {
      state.message = null;
    },
    /* Reducer key and value function to set the error state to null */
    resetError: (state, action) => {
      state.error = null;
    },
    /* Reducer key and value function to set the error and loading state as false */
    setError: (state, action) => {
      state.error = "Can't Add this product. Already In Cart";
    },
  },
  /* Object of extraReducer function */
  /* A "builder callback" function used to add more reducers */
  extraReducers: (builder) => {
    builder
      /* When getUserAsync promise is fulfilled updating the cart, name and user name */
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.cart];
        state.name = action.payload.name;
        state.userName = action.payload.username;
      })
      /* When getUserAsync promise is rejected setting the error message */
      .addCase(getUserAsync.rejected, (state, action) => {
        state.error = "Something Went Wrong 😔😔😔";
      })
      /* When updateUserAsync promise is fulfilled updating the cart*/
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.cart];
        state.message = "Product Added to Cart";
      });
  },
});

/* Creating and exporting userReducer using slice reducer method */
export const userReducer = userSlice.reducer;
/* Creating and exporting userActions using slice actions method */
export const userActions = userSlice.actions;

/* Selector function to get data */
export const getCart = (state) => state.user.cart;
export const getLoadingState = (state) => state.user.loading;
export const getUserMessage = (state) => state.user.message;
export const getUserError = (state) => state.user.error;
export const getName = (state) => state.user.name;
export const getUserName = (state) => state.user.userName;
