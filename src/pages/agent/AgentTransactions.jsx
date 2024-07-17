import { useEffect, useState } from "react";
import { useAuth } from "../../provider/AuthProvider";
import axios from "axios";

export default function AgentTransactions() {
  const { user } = useAuth();
  const agentPhone = user.phone;
  const token = localStorage.getItem("token");
  const [latestRequests, setLatestRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRequests = async () => {
      try {
        setLoading(true);

        // Fetch cash-in requests
        const cashInResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/cashin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cashInRequests = cashInResponse.data.filter(
          (request) => request.agentPhone === agentPhone
        );

        // Fetch cash-out requests
        const cashOutResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/cashout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cashOutRequests = cashOutResponse.data.filter(
          (request) => request.agentPhone === agentPhone
        );

        // Combine and sort requests by createdAt descending
        const allRequests = [...cashInRequests, ...cashOutRequests];
        allRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Set only the latest 20 requests
        const latestRequests = allRequests.slice(0, 20);
        setLatestRequests(latestRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchLatestRequests();
  }, [token, agentPhone]);

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto my-4">
        <p className="text-center font-bold text-2xl">Latest Transactions</p>
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
            {/* Table header */}
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {latestRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.type === "cashin" ? "Cash In" : "Cash Out"}</td>
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
