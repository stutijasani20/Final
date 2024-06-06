
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setToken } from "@/middleware.service";
import { removeToken } from "@/middleware.service";
interface User {
  id: string | null;
  email: string | null;
  role: string | null;
  jwt_token: {
    access: string;
    refresh: string;
  };
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
      localStorage.setItem("userId", action?.payload?.id ?? "");
      localStorage.setItem("isAuthenticated", "true");
      const token  = action.payload.jwt_token.access;
      setToken(token);
  
    },
    register(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userId", action.payload.id || "");
    
      localStorage.setItem("isAuthenticated", "true");
     
      
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
   
      localStorage.removeItem("isAuthenticated");
      removeToken()
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
