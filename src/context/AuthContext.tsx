import { createContext } from "react";
import type { User } from "../types";

interface AuthContextType {
  authUser: User | undefined;
  setAuthUser: (authUser: User | undefined) => void;
  setIsAuthorized: (arg: boolean) => void;
  isAuthorized: boolean;
  userMessage: string;
  setUserMessage: (arg: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
