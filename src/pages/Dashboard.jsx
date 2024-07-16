import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Cashless</title>
      </Helmet>
      <div className="text-center">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      </div>
    </div>
  )
}
