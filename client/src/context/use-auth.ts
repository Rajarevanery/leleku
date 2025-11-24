import { useGetUser } from "../lib/Tanstack/query/queries";

export const useAuth = () => {
  const { data, isPending } = useGetUser();

  return {
    id: data?.id ?? 0,
    email: data?.email ?? "",
    role: data?.role ?? "USER",
    full_name: data?.full_name ?? "UNKOWN",
    exp: data?.exp ?? 0,
    username: data?.username ?? "UNKNOWN USERNAME",
    isAuthenticated: !!data?.id,
    completedQuizzes: data?.completedQuizzes ? data.completedQuizzes : "NO DATA",
    isPending,
  };
};
