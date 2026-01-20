import axios from "axios";

const axiosInstance = axios.create({
  // 1. Local development backend (Firebase Functions Emulator)
  baseURL: import.meta.env.VITE_API_BASE_URL_LOCAL,
  // baseURL: VITE_API_BASE_URL_LOCAL

  // 2. Use this URL when Amazon-clone backend is deployed on Render.com
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export { axiosInstance };
