import api from "@/lib/axios"
import { CreateUserPayload } from "./admin.interfaces";

export const getAllAdminsApi = async () => {
    const { data } = await api.get('/api/user/getAllAdmins')
    return data
};

//get dashboard statistics
export const getStatistics = async () => {
    const { data } = await api.get('api/admin/getStatistics')
}

// to get one admin by id
export const getOneAdminByEmail = async ( email : string ) => {
    const { data } = await api.get(`api/admin/getOneAdmin`, {
        params : { email }
    })

    return data
}

//to update admin 
export const updateAdminByEmail = async (email : string, AData : string ) => {
    const { data } = await api.patch('api/admin/updateAdmin', AData)
}
//create user by admin
export const createUserByAdmin = async ( payload : CreateUserPayload) => {
    const { data } = await api.post('api/auth/createUser')
    return data
}


