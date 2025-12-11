import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const instance = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
