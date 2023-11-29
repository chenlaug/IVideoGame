/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from "react";

export default function BtnMain({ label, type, onClick }) {
  return (
    <button
      type={type}
      className="px-4 py-2 text-center font-medium text-light-TBleu bg-light-Yellow hover:bg-light-VCYellow border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
