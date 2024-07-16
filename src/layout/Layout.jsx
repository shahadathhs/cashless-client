import { Outlet } from "react-router-dom";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';


const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 min-h-screen-cal">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
