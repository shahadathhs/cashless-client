import { Navigate} from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../provider/AuthProvider";

const PrivateRoutes = ({children}) => {
  const {user, token} = useAuth();

  if (!token) {
    <Navigate to="/login"></Navigate>
  }

  if(!user){
    window.location.reload();
    return (
    <div className='w-full h-[300px] flex justify-center items-center text-3xl'>
      <span className="loading loading-spinner text-primary"></span>
      <span className="loading loading-spinner text-secondary"></span>
      <span className="loading loading-spinner text-accent"></span>
      <span className="loading loading-spinner text-neutral"></span>
      <span className="loading loading-spinner text-info"></span>
      <span className="loading loading-spinner text-success"></span>
      <span className="loading loading-spinner text-warning"></span>
      <span className="loading loading-spinner text-error"></span>
    </div>)
  }

  return children;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node,
}