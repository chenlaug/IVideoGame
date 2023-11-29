/* eslint-disable react/prop-types */
import React from "react";

export default function InputFile({ label, id, required, onChange }) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  border-gray-300"
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
