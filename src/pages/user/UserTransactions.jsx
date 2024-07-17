import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useAuth } from './../../provider/AuthProvider';

export default function UserTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions. Please try again later.");
      }
    };

    fetchTransactions();
  }, [user._id, token]);

  return (
    <div>
      <Helmet>
        <title>Transactions Management | Cashless</title>
      </Helmet>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl text-center font-bold">Transactions History</h1>
        <div className="flex justify-center">
          <div className="card-body card-bordered shadow-md max-w-md">
            {transactions.length === 0 ? (
              <p>No transactions found.</p>
            ) : (
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction._id} className="border-b py-2">
                    <p>Amount: {transaction.amount} Taka</p>
                    <p>Fee: {transaction.fee} Taka</p>
                    <p>Date: {new Date(transaction.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
