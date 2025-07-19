import { createContext } from "react";

export interface AuthUser {
  userEmail: string;
  password: string;
  usercode: string;
}

interface AuthContextType {
  authUser: AuthUser | undefined;
  setAuthUser: (authUser: AuthUser | undefined) => void;
  setIsAuthorized: (arg: boolean) => void;
  isAuthorized: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
