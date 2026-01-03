import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserRole = "super_admin" | "admin" | "user";

//user interface
interface UserData {
  id : string,
  username: string;
  email: string;
  role: UserRole;
  wins: number;
  duels: number;
}

//authstate
interface AuthState {
  user : UserData | null;
  accessToken: string | null;
  isAuth: boolean;
  setAuth: (token: string, user?: Partial<UserData>) => void;
  updateStates : (duels : number, wins : number) => void;
  logout: () => void;
}


//creating auth store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user : null,
      accessToken: null,
      isAuth: false,

      setAuth: (token, user) => {
        set({
          accessToken: token,
          isAuth: true,
          ...user, 
        });
      },

      updateStates(duels, wins) {
        set((state) => ({
          user : state.user ? {...state.user, duels, wins} : null,
        }))
      },

      logout: () => {
        set({
          user : null,
          accessToken: null,
          isAuth: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);