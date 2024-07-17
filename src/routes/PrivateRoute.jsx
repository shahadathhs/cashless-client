// import { Navigate } from "react-router-dom";
// import PropTypes from "prop-types";
import { useAuth } from "../provider/AuthProvider";

// const PrivateRoute = ({ children }) => {
//   const { user, token } = useAuth();
//   // const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // if (loading) {
//   //   return (
//   //     <div className="w-full h-[300px] flex justify-center items-center text-3xl">
//   //       <span className="loading loading-spinner text-primary"></span>
//   //       <span className="loading loading-spinner text-secondary"></span>
//   //       <span className="loading loading-spinner text-accent"></span>
//   //       <span className="loading loading-spinner text-neutral"></span>
//   //       <span className="loading loading-spinner text-info"></span>
//   //       <span className="loading loading-spinner text-success"></span>
//   //       <span className="loading loading-spinner text-warning"></span>
//   //       <span className="loading loading-spinner text-error"></span>
//   //     </div>
//   //   );
//   // }

//   if (!user) {
//     const handleReload = () => {
//       window.location.reload();
//     };

//     return (
//       <div>
//         <div className="w-full h-[300px] flex justify-center items-center text-3xl">
//           <span className="loading loading-spinner text-primary"></span>
//           <span className="loading loading-spinner text-secondary"></span>
//           <span className="loading loading-spinner text-accent"></span>
//           <span className="loading loading-spinner text-neutral"></span>
//           <span className="loading loading-spinner text-info"></span>
//           <span className="loading loading-spinner text-success"></span>
//           <span className="loading loading-spinner text-warning"></span>
//           <span className="loading loading-spinner text-error"></span>
//         </div>
//         <div className="text-center">
//           <button className="btn btn-outline" onClick={handleReload}>
//             Click To Reload
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // if (user) {
//   //   return children;
//   // }
//   return children;
//   // return <Navigate state={{ from: location }} to="/login" replace />;
// };

// PrivateRoute.propTypes = {
//   children: PropTypes.node,
// };

// export default PrivateRoute;
// PrivateRoute.js

import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
