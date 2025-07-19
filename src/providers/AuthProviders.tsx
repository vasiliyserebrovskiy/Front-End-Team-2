import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthorized) {
      setAuthUser(undefined);
      localStorage.removeItem("usercode");
      localStorage.removeItem("isAuthorized");
    }
  }, [isAuthorized]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, setIsAuthorized, isAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
