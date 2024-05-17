import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string | null;
  email: string | null;
  role: string | null;
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

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userRole", action?.payload?.role ?? "");
      localStorage.setItem("userId", action?.payload?.id ?? "");
      localStorage.setItem("isAuthenticated", "true");
    },
    register(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userId", action.payload.id || "");
      localStorage.setItem("userRole", action.payload.role || "");
      localStorage.setItem("isAuthenticated", "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
