import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

BtnNavLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  link: PropTypes.string.isRequired,
};

export default function BtnNavLink({ link, label }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `inline-block bg-light-Yellow ${
          isActive ? "text-dark-TWhite" : "text-light-TBleu "
        } hover:bg-light-VCYellow text-center font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`
      }
    >
      {label}
    </NavLink>
  );
}
