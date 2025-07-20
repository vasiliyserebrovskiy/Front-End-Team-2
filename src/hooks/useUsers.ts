import { useEffect, useState } from "react";
import type { User } from "../types";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState("");

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch("https://corsproxy.io/?https%3A%2F%2Ffakerestaurantapi.runasp.net%2Fapi%2FUser");
      if (!res.ok) {
        throw new Error("Failed to fetch users.Status: " + res.status);
      }
      const usersRes = await res.json();
      setUsers(usersRes);
    } catch (err) {
      if (err instanceof Error) {
        setErrMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error: errMessage };
}
