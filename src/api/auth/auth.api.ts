import api from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "./auth.types";


export const loginApi = async ( payload : LoginPayload ) => {
    const { data } = await api.post('api/auth/login', payload)
    return data
}

export const authApi = async ( payload : RegisterPayload ) => {
    const { data } = await api.post('api/auth/register', payload)
    return data
}

export const logoutApi = async () => {
    const { data } = await api.post('api/auth/logout')
    return data
}
