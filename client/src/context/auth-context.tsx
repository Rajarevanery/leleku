import { createContext, useContext } from "react";

type AuthContextType = {
  id: number;
  email: string;
  role: "USER" | "ADMIN" | string;
  isAuthenticated: boolean;
  isPending: boolean;
  full_name: string;
  username: string;
  exp: number;
  completedQuizzes: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error bruh");
  }
  return context;
};
