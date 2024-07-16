import { Helmet } from "react-helmet-async";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    Swal.fire({
      title: 'Success!',
      text: 'Logout Successful!',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
    navigate("/login")
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard | Cashless</title>
      </Helmet>
      <div className="pt-16 text-center">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </div>
  )
}
