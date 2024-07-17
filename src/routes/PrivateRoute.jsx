import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleReload = () => {
    window.location.reload();
  };

  if (!user) {
    return (
      <div>
        <div className="w-full h-[300px] flex justify-center items-center text-3xl">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
        <div className="text-center">
          <button className="btn btn-outline" onClick={handleReload}>
            Click To Reload
          </button>
        </div>
      </div>
    );
  }

  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
