import axios from "axios";

const api = axios.create({
  baseURL: "https://tmbackend-0pku.onrender.com",
});
export default api;
