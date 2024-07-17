import axios from "axios";
import { useEffect, useState } from "react";

export default function AllTransactions() {
  const token = localStorage.getItem("token");
  const [cashInRequests, setCashInRequests] = useState([]);
  const [cashOutRequests, setCashOutRequests] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCashInRequests = async () => {
      try {
        setLoading(true); 
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
      } finally {
        setLoading(false); 
      }
    };

    const fetchCashOutRequests = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false); 
      }
    };

    fetchCashInRequests();
    fetchCashOutRequests();
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto my-4">
        <p className="text-center font-bold text-2xl">Cash In</p>
        {loading ? (
          <div className="flex justify-center items-center h-32">
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
        )}
      </div>

      <div className="overflow-x-auto">
        <p className="text-center font-bold text-2xl">Cash Out</p>
        {loading ? (
          <div className="flex justify-center items-center h-32">
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
        )}
      </div>
    </div>
  );
}
