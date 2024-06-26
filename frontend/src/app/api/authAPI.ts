

import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/authSlice"; 
import { Dispatch } from "@reduxjs/toolkit";

const API_BASE_URL = "http://127.0.0.1:8000/api/auth"; 

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const register = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response.json();
  } catch (error: any) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh token failed");
  }

  return response.json();
};


export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  dispatch(logoutAction());
};
