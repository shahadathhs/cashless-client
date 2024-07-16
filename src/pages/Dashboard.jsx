import { Helmet } from "react-helmet-async";
import { useAuth } from "../provider/AuthProvider";

export default function Dashboard() {
  const {user} = useAuth()
  console.log(user)

  return (
    <div>
      <Helmet>
        <title>Dashboard | Cashless</title>
      </Helmet>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl text-center font-bold">Welcome to your dashboard!</h1>
        <div>
        <div className="flex justify-center">
      {user ? (
        <div className="card-body card-bordered shadow-md max-w-md">
          <p className="card-title">Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Phone: {user.phone}</p>
          <p>Balance: {user.balance}</p>
        </div>
      ) : (
        <p className="text-center font-bold">Loading user data...</p>
      )}
      </div>
    </div>
        
      </div>
    </div>
  )
}
