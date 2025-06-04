import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { Navigate, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to  login if not authenticated
  if (!isAuthenticated) {
    <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Navbar />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
