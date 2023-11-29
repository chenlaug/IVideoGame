/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from "react";

export default function Pagination({
  gamesPerPage,
  totalGames,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex items-center justify-center mt-5">
      <button
        type="button"
        className={`px-4 py-2 border bg-light-Yellow text-light-TBleu ${
          currentPage === 1 && "cursor-not-allowed opacity-50"
        }`}
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
      >
        Précédent
      </button>
      {pageNumbers.map(number => (
        <button
          type="button"
          key={number}
          className={`px-4 py-2 border ${
            currentPage === number ? "bg-light-Yellow text-light-TBleu" : ""
          }`}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        className={`px-4 py-2 border bg-light-Yellow text-light-TBleu ${
          (currentPage === pageNumbers.length || !pageNumbers.length) &&
          "cursor-not-allowed opacity-50"
        }`}
        onClick={() =>
          currentPage < pageNumbers.length && paginate(currentPage + 1)
        }
      >
        Suivant
      </button>
    </div>
  );
}
