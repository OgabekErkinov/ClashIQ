import { deleteUser, getLeaderboard, getPercentOfUsers, getUsersList } from "@/api/user/user.api"
import { IUser, LeaderBoardResponse } from "@/app/admin/props/props"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useUsersPersent = (year : number) => {
    return useQuery({
        queryKey : ["user-percent", year],
        queryFn : () => getPercentOfUsers(year)
    })
}

// admin/users => get user list hook
export const useUserList = () => {
    return useQuery({
        queryKey : ['user-list'],
        queryFn : getUsersList,
        staleTime : 1000 * 60,
        refetchOnWindowFocus : false,
        refetchInterval : 5000
    })
}

// admin/users => delete user hook
export const useDeleteUser = () => {
    const queryClient = useQueryClient()
     return useMutation({
        mutationFn : (id : string) => deleteUser(id),

        onSuccess : (_, userId) => {
            queryClient.invalidateQueries({queryKey : ['user-list']})   
        }
     })
}


//leaderboard query hook
export const useLeaderboard = () => {
    return useQuery({
        queryKey : ['leaderboard'],
        queryFn : getLeaderboard,
        staleTime : 1000*60,
        refetchOnWindowFocus : false,
        refetchInterval : 5000
    })
}