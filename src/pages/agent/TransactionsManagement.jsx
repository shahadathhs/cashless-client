import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function TransactionsManagement() {
  const { user } = useAuth();
  const agentPhone = user.phone;
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
        const allData = response.data;
        // Filter using agentPhone and filter data with pending status
        const filteredData = allData.filter(
          (request) => request.agentPhone === agentPhone && request.status === "pending"
        );
        setCashInRequests(filteredData);
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
        const allData = response.data;
        // Filter using agentPhone and filter data with pending status
        const filteredData = allData.filter(
          (request) => request.agentPhone === agentPhone && request.status === "pending"
        );
        setCashOutRequests(filteredData);
      } catch (error) {
        console.error("Error fetching cash-out requests:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCashInRequests();
    fetchCashOutRequests();
  }, [token, agentPhone]);

  const handleCashInApprove = async (requestId) => {
    try {
      if (user.status !== "active") {
        Swal.fire({
          icon: "error",
          title: "Cash-in Approve Failed",
          text: "Your Account is not Active.",
        });
        return;
      }
  
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cashin/approve/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setCashInRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status: "approved" } : request
        )
      );
    } catch (error) {
      console.error("Error approving cash-in request:", error);
      Swal.fire({
        icon: "error",
        title: "Cash-in Approve Failed",
        text: error.response?.data?.error || "Internal server error",
      });
    }
  };
  
  
  const handleCashOutApprove = async (requestId) => {
    try {
      if (user.status !== "active") {
        Swal.fire({
          icon: "error",
          title: "Cash-out Approve Failed",
          text: "Your Account is not Active.",
        });
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cashout/approve/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCashOutRequests(prevRequests =>
        prevRequests.map(request =>
          request._id === requestId ? { ...request, status: "approved" } : request
        )
      );
    } catch (error) {
      console.error("Error approving cash-out request:", error);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
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
        <>
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
                        request.status === 'pending' && <button className="btn btn-success"
                        onClick={() => handleCashInApprove(request._id)}>Approve</button>
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
                        request.status === 'pending' && <button className="btn btn-success"
                        onClick={() => handleCashOutApprove(request._id)}>Approve</button>
                      }
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
