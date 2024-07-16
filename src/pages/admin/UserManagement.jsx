import { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
        setError("");
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    if (search) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  const handleActivateUser = async (userId, role) => {
    const bonus = role === "agent" ? 10000 : 40;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { status: "active", balance: bonus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: "active", balance: bonus } : user
        )
      );
    } catch (error) {
      console.error("Error activating user:", error);
      setError("Failed to activate user.");
    }
  };
  

  const handleBlockUser = async (userId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { status: "blocked" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: "blocked" } : user
        )
      );
    } catch (error) {
      console.error("Error blocking user:", error);
      setError("Failed to block user.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered max-w-sm"
        />
      </div>
      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center text-3xl">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td
                    className={`${
                      user.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td>
                    {user.status === "pending"  && (
                        <button
                          onClick={() => handleActivateUser(user._id)}
                          className="btn btn-sm btn-outline text-green-700"
                        >
                          Activate
                        </button>
                      )}
                    {user.status === "active"  && (
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          className="btn btn-sm btn-outline text-red-700"
                        >
                          Block
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
