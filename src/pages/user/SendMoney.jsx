import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function SendMoney() {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const handleSendMoney = async (e) => {
    e.preventDefault();

    if (amount < 50) {
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Minimum transaction amount is 50 Taka.",
      });
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/sendmoney`,
        { amount, pin, senderPhone: user.phone, receiverPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Transaction Successful",
        text: "Money has been sent successfully.",
      });

      setAmount("");
      setPin("");
      setReceiverPhone("");
    } catch (error) {
      console.error("Error during transaction:", error);
      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        text: "Transaction failed. Please check your PIN and try again.",
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form
        onSubmit={handleSendMoney}
        className="card-body max-w-sm border-2 rounded-md shadow-md"
      >
        <h1 className="text-3xl font-bold mb-4">Send Money</h1>
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
          placeholder="Receiver's Phone"
          className="input input-bordered"
          value={receiverPhone}
          onChange={(e) => setReceiverPhone(e.target.value)}
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
          Send Money
        </button>
      </form>
    </div>
  );
}
