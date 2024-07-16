import { Helmet } from "react-helmet-async";

export default function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Cashless</title>
      </Helmet>
      <div className="p-4">
        <h1 className="text-2xl text-center font-bold">Welcome to your dashboard!</h1>
      </div>
    </div>
  )
}
