import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./provider/AuthProvider";
import DashboardLayout from "./layout/DashboardLayout";
import AllTransactions from './pages/admin/AllTransactions';
import UserManagement from './pages/admin/UserManagement';
import AgentTransactions from './pages/agent/AgentTransactions';
import TransactionsManagement from './pages/agent/TransactionsManagement';
import CashOut from './pages/user/CashOut';
import SendMoney from './pages/user/SendMoney';
import UserTransactions from './pages/user/UserTransactions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /> </PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      // for all
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /> </PrivateRoute>,
      },
      // for admin
      {
        path: "/dashboard/all-transactions",
        element: <PrivateRoute><AllTransactions /> </PrivateRoute>,
      },
      {
        path: "/dashboard/user-management",
        element: <PrivateRoute><UserManagement /> </PrivateRoute>,
      },
      // for agent
      {
        path: "/dashboard/agent-transactions",
        element: <PrivateRoute><AgentTransactions /> </PrivateRoute>,
      },
      {
        path: "/dashboard/transactions-management",
        element: <PrivateRoute><TransactionsManagement /> </PrivateRoute>,
      },
      // for user
      {
        path: "/dashboard/cash-out",
        element: <PrivateRoute><CashOut /> </PrivateRoute>,
      },
      {
        path: "/dashboard/send-money",
        element: <PrivateRoute><SendMoney /> </PrivateRoute>,
      },
      {
        path: "/dashboard/user-transactions",
        element: <PrivateRoute><UserTransactions /> </PrivateRoute>,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
