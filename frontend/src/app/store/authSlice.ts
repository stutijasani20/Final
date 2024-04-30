// authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string | null;
  email: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log("+++++++", state.isAuthenticated);
    },
    register(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      // state.user = null;
    },
  },
});

export const { login, register, logout } = authSlice.actions;

// Export the reducer function
export default authSlice.reducer;
