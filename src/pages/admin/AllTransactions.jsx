import axios from "axios";
import { useEffect, useState } from "react";

export default function AllTransactions() {
  const token = localStorage.getItem("token");
  const [cashInRequests, setCashInRequests] = useState([]);
  const [cashOutRequests, setCashOutRequests] = useState([]);

  useEffect(() => {
    const fetchCashInRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cashin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCashInRequests(response.data);
      } catch (error) {
        console.error("Error fetching cash-in requests:", error);
      }
    };

    const fetchCashOutRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cashout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setCashOutRequests(response.data);
      } catch (error) {
        console.error("Error fetching cash-out requests:", error);
      }
    };

    fetchCashInRequests();
    fetchCashOutRequests();
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto my-4">
        <p className="text-center font-bold text-2xl">Cash In</p>
        <table className="table table-zebra max-w-lg mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody>
            {cashInRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.amount}</td>
                <td>{request.status}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <p className="text-center font-bold text-2xl">Cash Out</p>
        <table className="table table-zebra max-w-lg mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
              
            </tr>
          </thead>
          <tbody>
            {cashOutRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.amount}</td>
                <td>{request.status}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
