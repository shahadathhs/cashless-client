import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../provider/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/balance/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance. Please try again later.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Cashless</title>
      </Helmet>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl text-center font-bold">
          Welcome to your dashboard!
        </h1>
        <div>
          <div className="flex justify-center">
            <div className="card-body card-bordered shadow-md max-w-md">
              <p className="card-title">Welcome, {user?.name}!</p>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
              <p>Phone: {user?.phone}</p>
              <button
                className="btn btn-primary mt-4"
                onClick={fetchBalance}
              >
                Check Balance
              </button>
              {balance !== null && (
                <p className="mt-2">Balance: {balance} Taka</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
