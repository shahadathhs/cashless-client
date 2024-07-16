import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from './../../provider/AuthProvider';

export default function CashOut() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCashOut = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }

    if (amount < 50) {
      setError("Minimum cash-out amount is 50 Taka.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/cashout`,
        { amount, pin, agentId: user.agentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Cash-out successful.");
      setError("");
      setAmount("");
      setPin("");
    } catch (error) {
      console.error("Error during cash-out:", error);
      setError("Cash-out failed. Please check your PIN and try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cash Out</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleCashOut}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="amount">
            Amount (in Taka)
          </label>
          <input
            type="number"
            id="amount"
            className="w-full p-2 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="pin">
            PIN
          </label>
          <input
            type="password"
            id="pin"
            className="w-full p-2 border border-gray-300 rounded"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Cash Out
        </button>
      </form>
    </div>
  );
}
