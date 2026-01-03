import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserRole = "super_admin" | "admin" | "user";

//user interface
interface UserData {
  username: string;
  email: string;
  role: UserRole;
  won: number;
  duels: number;
}

//authstate
interface AuthState extends UserData {
  accessToken: string | null;
  isAuth: boolean;
  setAuth: (token: string, user?: Partial<UserData>) => void;
  logout: () => void;
}


//creating auth store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuth: false,
      username: "",
      email: "",
      role: "user",
      won: 0,
      duels: 0,

      setAuth: (token, user) => {
        set({
          accessToken: token,
          isAuth: true,
          ...user, 
        });
      },

      logout: () => {
        set({
          accessToken: null,
          isAuth: false,
          username: "",
          email: "",
          role: "user",
          won: 0,
          duels: 0,
        });
        localStorage.removeItem("auth-storage"); 
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);