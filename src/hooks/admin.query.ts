import { createUserByAdmin, getAllAdminsApi } from "@/api/admin/admin.api";
import { CreateUserPayload } from "@/api/admin/admin.interfaces";
import { useModalStore } from "@/store/modal.store";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAdminsList = () => {
    return useQuery({
    queryKey : ['admins-list'],
    queryFn : getAllAdminsApi,
    staleTime : 1000 * 60,
    refetchOnWindowFocus : false,
    refetchInterval : 5000
})
}

  //create user hook
  export const useCreateUserByAdmin = () => {
  const queryClient = useQueryClient();        
  const closeModal = useModalStore(
    (state) => state.closeModal
  );                                        

  return useMutation({
    mutationFn: (payload: CreateUserPayload) =>
      createUserByAdmin(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins-list"],
      });
      closeModal();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error(
        "Error registration:",
        error.response?.data?.message
      );
    },
  });
};