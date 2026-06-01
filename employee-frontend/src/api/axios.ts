import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            "Something went wrong";

        toast.error(message);

        return Promise.reject(error);
    }
);

export default api;