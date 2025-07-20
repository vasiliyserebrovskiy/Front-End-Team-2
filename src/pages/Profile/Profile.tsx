import { useCallback, useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import type { UserDetails } from "./types";
import { useNavigate } from "react-router-dom";

async function fetchUserDetailsFromApi(): Promise<UserDetails> {
  const res = await fetch(`https://randomuser.me/api`);
  const resObj = await res.json();
  const userDetails = resObj.results[0];
  return userDetails;
}

export default function Profile() {
  const { authUser, setIsAuthorized, userMessage, setUserMessage } =
    useAuthUser();
  const [userDetail, setUserDetail] = useState<UserDetails | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const fetchUserDetails = useCallback(async () => {
    const user = await fetchUserDetailsFromApi();
    setUserDetail(user);
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  async function handleDelete() {
    setUserMessage("");
    const res = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://fakerestaurantapi.runasp.net/api/User/${authUser?.usercode}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      setIsAuthorized(false);
      navigate("/");
    }
  }

  const handleChangePassword = () => {
    setUserMessage("");
    navigate("/change-password");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-[20px]">
      <h2>Profile</h2>
      {userMessage ? <div className="text-green-600">{userMessage}</div> : null}
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
            <button
              type="button"
              onClick={handleChangePassword}
              className="border w-[200px] rounded-[10px]"
            >
              Change password
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="border w-[200px] rounded-[10px]"
            >
              Delete account
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
