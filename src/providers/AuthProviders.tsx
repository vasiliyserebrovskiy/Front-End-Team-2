import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import type { User, UserDetails } from "../types";
import type { UserDetailsResponse } from "../pages/Profile/types";

const mapUserDetails = (obj: UserDetailsResponse): UserDetails => {
  const img = obj.picture.large;
  const name = `${obj.name.title} ${obj.name.first} ${obj.name.last}`;
  const address = `${obj.location.street.number}, ${obj.location.street.name} street, ${obj.location.city}, ${obj.location.state}, ${obj.location.country}`;
  const userDetails: UserDetails = {
    img: img,
    name: name,
    phone: obj.phone,
    address: address,
  };
  return userDetails;
};

async function fetchUserDetailsFromApi(): Promise<UserDetailsResponse> {
  const res = await fetch(`https://randomuser.me/api`);
  const resObj = await res.json();
  const userDetails = resObj.results[0];
  return userDetails;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | undefined>(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : undefined;
  });

  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem("isAuthorized") === "true";
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>(
    () => {
      const stored = localStorage.getItem("userDetails");
      return stored ? JSON.parse(stored) : undefined;
    }
  );

  const fetchUserDetails = useCallback(async () => {
    const userDetailsObj: UserDetailsResponse = await fetchUserDetailsFromApi();
    const userDetails: UserDetails = mapUserDetails(userDetailsObj);
    setUserDetails(userDetails);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const storedDetails = localStorage.getItem("userDetails");
      if (
        !storedDetails ||
        storedDetails === "undefined" ||
        storedDetails === ""
      ) {
        fetchUserDetails();
      }
    } else {
      setAuthUser(undefined);
      setUserDetails(undefined);
      setSuccessMessage("");

      ["usercode", "isAuthorized", "authUser", "userDetails"].forEach((key) =>
        localStorage.removeItem(key)
      );
    }
  }, [isAuthorized, fetchUserDetails]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isAuthorized,
        setIsAuthorized,
        successMessage,
        setSuccessMessage,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
