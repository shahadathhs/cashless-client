import { useState } from "react";
import axios from "axios";
import { useAuth } from "./../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function CashOut() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const handleCashOut = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cashout`,
        { amount, pin, phone: user.phone, agentPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success Notification
      Swal.fire({
        icon: "success",
        title: "Cash-out Request Successful",
        text: "Cash-out request has been send successfully.",
      });

      setAmount("");
      setPin("");
      setAgentPhone("")
    } catch (error) {
      console.error("Error during cash-out:", error);
      Swal.fire({
        icon: "error",
        title: "Cash-out Request Failed",
        text: "Cash-out request failed. Please check your PIN and try again.",
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form
        onSubmit={handleCashOut}
        className="card-body max-w-sm border-2 rounded-md shadow-md"
      >
        <h1 className="text-3xl font-bold mb-4">Cash Out</h1>
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
        <button type="submit" className="btn btn-primary">
          Cash Out
        </button>
      </form>
    </div>
  );
}
