import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/AuthAPI/auth";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get_user"],
    queryFn: async () => await getUser(),
  });
};

