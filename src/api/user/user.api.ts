import api from "@/lib/axios"

export const getPercentOfUsers = async (year : number) => {
    const { data } = await api.get('/api/user/getPercentOfUsers', { params : { year } })
    return data
}

//  /admin/users => get users list
export const getUsersList = async () => {
    const { data }  = await api.get('/api/user/getAllUsers')
    return data
}

// /user/users => delete user
export const deleteUser = async (id : string) => {
    const { data } = await api.delete(`/api/user/deleteUser/${id}`)
    return data
}

//get leaderboard
export const getLeaderboard = async () => {
    const { data } = await api.get('/api/user/getLeaderBoard')
    return data
}