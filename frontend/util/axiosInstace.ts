import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
