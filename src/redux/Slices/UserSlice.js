import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  logoutUser,
  registerUser,
  addUser,
  fetchUsers,
  updateUser,
  deleteUser,
} from "@/services/UserService";
export const registerUserAsync = createAsyncThunk(
  "user/register",
  registerUser
);
export const loginUserAsync = createAsyncThunk("user/login", loginUser);
export const addUserAsync = createAsyncThunk("user/addUser", addUser);
export const logoutUserAsync = createAsyncThunk("user/logout", logoutUser);
export const fetchUsersAsync = createAsyncThunk("user/fetchUsers", fetchUsers);
export const editUserAsync = createAsyncThunk("user/editUser", updateUser);
export const deleteUserAsync = createAsyncThunk("user/deleteUser", deleteUser);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    role: null,
    users: { data: [], pagination: {} },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = state.user.data.role;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", state.role);


      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = state.user.data.role;
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("role", state.role);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users.data.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        console.log(state.loading);
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.role = null;
        localStorage.removeItem("user");
        localStorage.removeItem("role");

      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAsync.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(editUserAsync.fulfilled, (state, action) => {
        console.log("action.payload", action.payload.user);
        state.loading = false;
        state.user = action.payload.user;

        state.users.data = state.users.data.map((user) => {
          if (user.id === action.payload.user.id) {
            return action.payload.user;
          }
          return user;
        });
      })

      .addCase(editUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      });
  },
});
export default userSlice.reducer;
