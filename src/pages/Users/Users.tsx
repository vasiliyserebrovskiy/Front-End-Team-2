import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import useUsers from "../../hooks/useUsers";

export default function Users() {
  const { users, loading, error } = useUsers();
  const { isAuthorized } = useAuthUser();
  const navigate = useNavigate();

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 space-y-6">
        <p className="text-xl text-gray-800 text-center">
          You need to login to see the users list.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="w-[200px] py-2 rounded-[10px] border text-gray-800 transition cursor-pointer hover:bg-gray-100 active:opacity-90"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-600 mt-8">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Users List
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <li
            key={u.usercode}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="text-sm text-gray-500 mb-1">Email:</div>
            <h3 className="text-lg font-semibold text-gray-800 truncate max-w-full overflow-hidden text-ellipsis">
              {u.userEmail}
            </h3>

            <div className="text-sm text-gray-500 mt-3 mb-1">User Code:</div>
            <p className="text-sm text-gray-700 break-words">{u.usercode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
