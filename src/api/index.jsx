import axios from "axios";

const api = axios.create({
  baseURL: "https://t-m-backend.onrender.com",
});
export default api;
