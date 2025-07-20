import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");

  useEffect(() => {
    if (!isAuthorized) {
      setAuthUser(undefined);
      setUserMessage("");
      localStorage.removeItem("usercode");
      localStorage.removeItem("isAuthorized");
    }
  }, [isAuthorized]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        setIsAuthorized,
        isAuthorized,
        userMessage,
        setUserMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
