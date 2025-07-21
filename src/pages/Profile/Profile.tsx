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
    }
  }

  const handleChangePassword = () => {
    setSuccessMessage("");
    navigate("/change-password");
  };

  return (
    <section className="flex flex-col justify-center items-center gap-[20px]">
      <h2>Profile</h2>
      {successMessage ? (
        <div className="text-green-600">{successMessage}</div>
      ) : null}
      {isAuthorized && userDetails ? (
        <div className="flex flex-col justify-center items-center gap-[20px] border-2 rounded-[10px] p-2">
          <img
            src={userDetails.img}
            alt="user picture"
            className="rounded-[20px]"
          />
          <p>
            <span className="font-bold">Name: </span> {userDetails.name}
          </p>

          <p>
            <span className="font-bold">Email: </span> {authUser?.userEmail}
          </p>
          <p>
            <span className="font-bold">Phone number: </span>{" "}
            {userDetails.phone}
          </p>
          <p>
            <span className="font-bold">Address: </span>
            {userDetails.address}
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
      ) : (
        <p>You need to login first.</p>
      )}
    </section>
  );
}
