import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, logoutApi, sendOTPApi, verifyAndRegistr } from "@/api/auth/auth.api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { RegisterPayload } from "@/api/auth/auth.types";

export const useAuthActions = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logOutStore = useAuthStore((s) => s.logout);
  const router = useRouter();
  const queryClient = useQueryClient();

// login hook
const loginMutation = useMutation({
  mutationFn: loginApi,
  onSuccess: (data) => {
    setAuth(data?.accessToken, data?.user); 

    const role = data?.user?.role;

    if (role === 'user') {
      router.push("/user");
    } else {
      router.push("/admin");
    }
  },
  onError: (error: any) => {
    console.error("Error to enter:", error);
  }
});

  // OTP hook : to get verification code
  const OTPMutation = useMutation({
    mutationFn: (email : string) => sendOTPApi(email),
  });

  //Registr hook
  const verifyAndRegistrMutation = useMutation({
    mutationFn : (payload : RegisterPayload) => verifyAndRegistr(payload),
    onSuccess : (data) => {
      setAuth(data?.accessToken, data?.user)
      if(data?.user?.role === 'user'){
        router.push('/user')
      }else{
        router.push('/admin')
      }
    },
    onError : (error : any) => {
      console.error(`Erro registration : ${error}`)
    }
  })


  // logout hook
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
    sendOTP : OTPMutation,
    register : verifyAndRegistrMutation,
    logout: logoutMutation,
  };
};