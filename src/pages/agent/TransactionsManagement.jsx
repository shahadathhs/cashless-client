import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./../../provider/AuthProvider";

export default function TransactionsManagement() {
  const { user } = useAuth();
  const agentPhone = user.phone;
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
        const allData = response.data;
        // Filter using agentPhone and set filter data
        const filteredData = allData.filter(
          (request) => request.agentPhone === agentPhone
        );
        setCashInRequests(filteredData);
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
        const allData = response.data;
        // Filter using agentPhone and set filter data
        const filteredData = allData.filter(
          (request) => request.agentPhone === agentPhone
        );
        setCashOutRequests(filteredData);
      } catch (error) {
        console.error("Error fetching cash-out requests:", error);
      }
    };

    fetchCashInRequests();
    fetchCashOutRequests();
  }, [token, agentPhone]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto my-4">
        <p className="text-center font-bold text-2xl">Cash In</p>
        <table className="table table-zebra max-w-xl mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cashInRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.amount}</td>
                <td>{request.status}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
                <td>
                  {
                    (request.status === "pending" ? 
                      <button className="btn btn-success">Approve</button>
                      : null
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <p className="text-center font-bold text-2xl">Cash Out</p>
        <table className="table table-zebra max-w-xl mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cashOutRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.amount}</td>
                <td>{request.status}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
                <td>
                  {
                    (request.status === "pending" ? 
                      <button className="btn btn-success">Approve</button>
                      : null
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
