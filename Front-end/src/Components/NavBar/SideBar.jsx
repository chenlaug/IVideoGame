/* eslint-disable react/prop-types */
import { NavLink, useLocation } from "react-router-dom";
import Kirky from "../../Image/kirby-deaf.gif";
import { links } from "../../Utils/tableauOptionSelect";

export default function SideBar({ hovered, setHovered }) {
  const location = useLocation();
  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-200 ease-in-out transform bg-light-LightGray dark:bg-dark-BlackGray ${
        hovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col items-center">
        <img src={Kirky} alt="Kirky" className="my-4" />
        <div className="my-4 text-white">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                to={link.to}
                key={link.to}
                className={`flex items-center space-x-2 my-1 ${
                  isActive
                    ? " text-light-TYellow "
                    : "text-light-TBlack dark:text-dark-TWhite"
                }`}
              >
                <span>{link.icon}</span>
                {hovered && <span>{link.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
