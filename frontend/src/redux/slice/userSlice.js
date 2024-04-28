import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userName: "",
  cart: [],
  loading: false,
  message: null,
  error: null,
};

export const getUserAsync = createAsyncThunk("user/get", async () => {
  /* Making the GET API Call to get products array */
  const response = await fetch("http://localhost:3000/user");
  /* Returning the promise */
  return await response.json();
});

export const updateUserAsync = createAsyncThunk(
  "user/update",
  async (payload) => {
    console.log("Async Handeller");
    const response = await fetch("http://localhost:3000/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    /* Returning the promise */
    return await response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state, action) => {
      state.message = null;
    },
    resetError: (state, action) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = "Can't Add this product. Already In Cart";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.cart];
        state.name = action.payload.name;
        state.userName = action.payload.username;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.error = "Something Went Wrong 😔😔😔";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        // console.log("...........", action.payload);
        state.cart = [...action.payload.cart];
        state.message = "Product Added to Cart";
      });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

export const getCart = (state) => state.user.cart;
export const getLoadingState = (state) => state.user.loading;
export const getUserMessage = (state) => state.user.message;
export const getUserError = (state) => state.user.error;
export const getName = (state) => state.user.name;
export const getUserName = (state) => state.user.userName;
