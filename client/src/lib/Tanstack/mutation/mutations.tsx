import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser } from "../../../api/AuthAPI/auth";
import type { ILogin, IRegister } from "../../../types/types";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ILogin) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IRegister) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};
