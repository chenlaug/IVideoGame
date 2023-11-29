/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";

export default function BtnNavLink({ link, label }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `inline-block bg-light-Yellow ${
          isActive
            ? "text-light-TBlack dark:text-dark-TWhite"
            : "text-light-TBleu"
        } hover:bg-light-VCYellow text-center font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`
      }
    >
      {label}
    </NavLink>
  );
}
