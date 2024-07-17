import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useAuth } from "./../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function CashIn() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const token = localStorage.getItem("token");

  const handleCashIn = async (e) => {
    e.preventDefault();

    if (amount < 50) {
      Swal.fire({
        icon: "error",
        title: "Cash-in Failed",
        text: "Minimum cash-in amount is 50 Taka.",
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cashin`,
        { amount, pin, phone: user.phone, agentPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Cash-in Request Successful",
        text: "Cash-in request has been send successfully.",
      });

      setAmount("");
      setPin("");
      setAgentPhone("");
    } catch (error) {
      console.error("Error during cash-in:", error);
      Swal.fire({
        icon: "error",
        title: "Cash-in Request Failed",
        text: "Cash-in request failed. Please check your PIN and try again.",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Cash In | Cashless</title>
      </Helmet>
      <div className="p-4 max-w-md mx-auto">
        <form
          onSubmit={handleCashIn}
          className="card-body max-w-sm border-2 rounded-md shadow-md"
        >
          <h1 className="text-3xl font-bold mb-4">Cash In</h1>
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Agent's Phone"
            className="input input-bordered"
            value={agentPhone}
            onChange={(e) => setAgentPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="PIN"
            className="input input-bordered"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
