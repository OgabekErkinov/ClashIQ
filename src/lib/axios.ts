import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

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
    async (error) => {
        const originalReq = error.config;

        if(error.response?.status === 403 && !originalReq._retry){
            originalReq._retry = true;

            try {
                const refreshRes = await axios.get("/api/auth/refresh", { withCredentials : true });
                const newToken = refreshRes.data.accessToken;
                useAuthStore.getState().setAuth(newToken)

                //refetch request
                originalReq.headers.Authorization = `Bearer ${newToken}`
                return axios(originalReq)
                
            } catch (error) {
                useAuthStore.getState().logout();
                window.location.href = "/";
                return Promise.reject(error)
                
            }
        }

        //401
        if(error.response?.status === 401){
            useAuthStore.getState().logout();
            window.location.href = '/'
        }

        return Promise.reject(error)
    }
);

export default api

