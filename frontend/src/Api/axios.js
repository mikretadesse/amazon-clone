import axios from "axios";

const axiosInstance = axios.create({
  // 1. Local development backend (Firebase Functions Emulator)
  // baseURL: "http://127.0.0.1:5001/clone-e4553/us-central1/api",

  // 2. Use this URL when Amazon-clone backend is deployed on Render.com
  baseURL: "https://mikre-amazon-clone-2025-backend.onrender.com",
});

export { axiosInstance };
