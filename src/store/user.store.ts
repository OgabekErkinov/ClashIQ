import { create } from "zustand";

interface UserState {
    username : string,
    email : string,
    currentRoom : string | null,
    image? : string,
    won : number,
    duels : number,
    setUser : (payload : UserState) => void
}
export const useUserStore = create<UserState>((set) => ({
    username : 'Username',
    email : 'username@gmail.com',
    currentRoom : null,
    won : 0,
    duels : 0,
    setUser : (payload) => {
        set({ ...payload })
    }
}))