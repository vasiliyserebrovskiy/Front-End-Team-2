import { createContext } from "react";
import type { User, UserDetails } from "../types";

interface AuthContextType {
  authUser: User | undefined;
  setAuthUser: (authUser: User | undefined) => void;
  isAuthorized: boolean;
  setIsAuthorized: (arg: boolean) => void;
  successMessage: string; // change name to successMessage
  setSuccessMessage: (arg: string) => void;
  userDetails: UserDetails | undefined;
  setUserDetails: (userDetails: UserDetails | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
