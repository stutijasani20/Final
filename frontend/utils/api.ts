// utils/api.ts

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/auth/google_auth/'; // Replace with your backend API base URL

export const googleAuth = async () => {
  try {
    const response = await axios.post(`${BASE_URL}api/auth/google_auth/`);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw new Error('Google authentication failed');
  }
};
