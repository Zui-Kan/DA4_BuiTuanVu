import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8009/api",
  timeout: 1000 * 60 * 30 * 3,
});

export const uploads = () => "http://localhost:2810/";
