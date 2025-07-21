import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const {
    authUser,
    isAuthorized,
    setIsAuthorized,
    successMessage,
    setSuccessMessage,
    userDetails,
  } = useAuthUser();
  const [errMessage, setErrMessage] = useState<string>("");
  const navigate = useNavigate();

  async function handleDelete() {
    setSuccessMessage("");
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
    } else {
      const resObj = await res.json();
      setErrMessage(
        "Delete error: status: " + res.status + ", message: " + resObj.message
      );
    }
  }

  const handleChangePassword = () => {
    setSuccessMessage("");
    navigate("/change-password");
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);

  return (
    <section className="flex flex-col justify-center items-center gap-[20px] m-3">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      {successMessage ? (
        <div className="text-green-600">{successMessage}</div>
      ) : null}
      {errMessage ? <div className="text-red-500">{errMessage}</div> : null}
      {isAuthorized && userDetails ? (
        <div className="flex flex-col justify-center items-center w-[500px] gap-[20px] p-[50px] border-2 shadow-md border-gray-200 rounded-lg bg-white">
          <img
            src={userDetails.img}
            alt="user picture"
            className="w-[200px] h-[200px] object-cover rounded-[20px] shadow-md shadow-gray-800 bg-white"
          />
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-800 mb-2">
              Name:
            </span>
            <p>{userDetails.name}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-800 mb-2">
              Email:
            </span>
            <p>{authUser?.userEmail}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-800 mb-2">
              Phone number:
            </span>
            <p> {userDetails.phone}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-800 mb-2">
              Address:
            </span>
            <p className="text-center">{userDetails.address}</p>
          </div>
          <div className="flex gap-2 ">
            <button
              type="button"
              onClick={handleChangePassword}
              className="border w-[200px] border-gray-300 rounded-lg text-xl text-gray-800 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:translate-y-[1px] transition duration-150 ease-in-out"
            >
              Change password
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="border w-[200px] border-gray-300 rounded-lg text-xl text-gray-800 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:translate-y-[1px] transition duration-150 ease-in-out"
            >
              Delete account
            </button>
          </div>
        </div>
      ) : (
        <p>You need to login first.</p>
      )}
    </section>
  );
}
