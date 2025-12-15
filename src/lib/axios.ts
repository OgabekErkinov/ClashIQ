import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { config } from "process";

//matching baseurl by creating api with axios
const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

//api interceptors
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    //if token isn't available yet
    if(token) {
        config.headers.Authorization = `Bearer ${ token }`;
    }
    return config
})

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if(err.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = '/login'
        }
    }
);

export default api

