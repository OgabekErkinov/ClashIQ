import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, authApi, logoutApi } from "@/api/auth/auth.api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export const useAuthActions = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logOutStore = useAuthStore((s) => s.logout);
  const router = useRouter();
  const queryClient = useQueryClient();

// LOGIN HOOK
// /////////////////////////////////////////////////////////
const loginMutation = useMutation({
  mutationFn: loginApi,
  onSuccess: (data) => {
    setAuth(data?.accessToken, data?.user); 

    const userRole = data?.user?.role || data?.role;

    if (userRole === 'admin' || userRole === 'super_admin') {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  },
  onError: (error: any) => {
    console.error("Kirishda xatolik:", error);
  }
});

// ////////////////////////////////////////////////////////////////////

  // REGISTER (yoki umumiy auth) HOOK
// ////////////////////////////////////////////////////////////////////
  const authMutation = useMutation({
    mutationFn: authApi,
    onSuccess: (data) => {
      if (data?.accessToken) {
        setAuth(data.accessToken, data?.user);
        router.push("/dashboard");
      }
    },
  });

  // LOGOUT HOOK
// ////////////////////////////////////////////////////////////////////
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logOutStore(); // Store-ni tozalash
      queryClient.clear(); // TanStack Query keshini to'liq tozalash (xavfsizlik uchun)
      router.push("/login"); // Login sahifasiga qaytarish
    },
  });

  return {
    login: loginMutation,
    auth: authMutation,
    logout: logoutMutation,
  };
};