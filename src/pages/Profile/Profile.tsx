import { useCallback, useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import type { UserDetails } from "./types";

async function fetchUserDetailsFromApi(): Promise<UserDetails> {
  const res = await fetch(`https://randomuser.me/api`);
  const resObj = await res.json();
  const userDetails = resObj.results[0];
  console.log("User details fetch: " + JSON.stringify(userDetails, null, 2));
  return userDetails;
}

export default function Profile() {
  const { authUser } = useAuthUser();
  const [userDetail, setUserDetail] = useState<UserDetails | undefined>(
    undefined
  );

  const fetchUserDetails = useCallback(async () => {
    const user = await fetchUserDetailsFromApi();
    setUserDetail(user);
    console.log("User details callback: " + JSON.stringify(user, null, 2));
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <section className="flex flex-col justify-center items-center gap-[20px]">
      <h2>Profile</h2>

      {userDetail ? (
        <div className="flex flex-col justify-center items-center gap-[20px] border-2 rounded-[10px] p-2">
          <img
            src={userDetail?.picture.large}
            alt="user picture"
            className="rounded-[20px]"
          />
          <p>
            <span className="font-bold">Name:</span> {userDetail?.name.title}{" "}
            {userDetail?.name.first} {userDetail?.name.last}
          </p>

          <p>
            <span className="font-bold">Email:</span> {authUser?.userEmail}
          </p>
          <p>
            <span className="font-bold">Phone number:</span> {userDetail?.phone}
          </p>
          <p>
            <span className="font-bold">Address:</span>{" "}
            {userDetail.location.street.number},{" "}
            {userDetail.location.street.name} street, {userDetail.location.city}
            , {userDetail.location.state}, {userDetail.location.country}{" "}
          </p>
          <div className="flex gap-2 ">
            <button type="button" className="border w-[200px] rounded-[10px]">
              Change password
            </button>
            <button type="button" className="border w-[200px] rounded-[10px]">
              Delete account
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
