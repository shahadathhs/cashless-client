import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  let role = user.role;

  const handleLogout = () => {
    logout();
    Swal.fire({
      title: "Success!",
      text: "Logout Successful!",
      icon: "success",
      confirmButtonText: "Cool",
    });
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content border-[1px] border-blue-500 shadow-md rounded-md m-2 p-2 min-h-[500px]">
        {/* Page content here */}
        <div className="w-full text-center my-2">
          <button
            htmlFor="my-drawer-2"
            className="btn btn-outline text-blue-600 drawer-button lg:hidden"
          >
            Open DashBoard
          </button>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-blue-600 text-white space-y-2">
          {/* Sidebar content here */}
          <button onClick={handleLogout} className="btn btn-outline btn-md ">
            Logout
          </button>
          <div className="divider divider-neutral">OR</div>
          {/* dashboard */}
          {/* for admin */}
          <li>
            <Link to="/dashboard" className="btn btn-outline">
              Dashboard
            </Link>
          </li>
          {role === "admin" && (
            <>
              <li>
                <Link
                  to="/dashboard/all-transactions"
                  className="btn btn-outline"
                >
                  All Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user-management"
                  className="btn btn-outline"
                >
                  User Management
                </Link>
              </li>
            </>
          )}
          {role === "agent" && (
            <>
              <li>
                <Link
                  to="/dashboard/agent-transactions"
                  className="btn btn-outline"
                >
                  Agent Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/transactions-management"
                  className="btn btn-outline"
                >
                  Transactions Management
                </Link>
              </li>
            </>
          )}
          {role === "user" && (
            <>
              <li>
                <Link
                  to="/dashboard/cash-out"
                  className="btn btn-outline"
                >
                  Cash Out
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/send-money"
                  className="btn btn-outline"
                >
                  Send Money
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user-transactions"
                  className="btn btn-outline"
                >
                  User Transactions
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
