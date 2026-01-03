import api from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "./auth.types";


export const loginApi = async ( payload : LoginPayload ) => {
    const { data } = await api.post('api/auth/login', payload)
    return data
}

export const sendOTPApi = async ( payload : string ) => {
    const { data } = await api.post('api/auth/sendOTP', payload)
    return data
}

export const verifyAndRegistr = async ( payload : RegisterPayload) => {
    const { data } = await api.post('api/auth/verifyAndRegistr')
    return data
}

export const logoutApi = async () => {
    const { data } = await api.post('api/auth/logout')
    return data
}
