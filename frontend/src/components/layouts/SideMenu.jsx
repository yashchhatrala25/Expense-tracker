import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("");

  const { user, clearUser } = useContext(UserContext);

  const handleClick = ({ path, label }) => {
    if (path === "logout") {
      handleLogout();
      return;
    }

    navigate(path);
    setActiveNavItem(label);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  /**
   * If a user directly comes from the URL
   * Then we have to manage for the activeNavItem
   * Which will be handled by below useEffect
   * */
  useEffect(() => {
    if (location.pathname) {
      setActiveNavItem(location.pathname.split("/")[1]);
    }
  }, [location]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[60px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => {
        const { label } = item;
        return (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3
            ${
              activeNavItem === label.toLowerCase()
                ? "text-white bg-primary"
                : "text-gray-800"
            }
          `}
            onClick={() => handleClick(item)}
          >
            <item.icon className="text-xl" />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;
