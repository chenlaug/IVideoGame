/* eslint-disable react/prop-types */
import React from "react";
import BtnMain from "../Btn/BtnMain";
import InputMain from "../Input/InputMain";

export default function Searchbar({ query, handleSearch }) {
  return (
    <form className="w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg mx-auto">
      <div className="flex items-center border-b-2 border-light-Yellow py-2">
        <InputMain
          value={query}
          onChange={handleSearch}
          type="text"
          placeholder="Rechercher un jeu..."
          className="flex-grow"
        />

        <BtnMain
          label="Rechercher"
          type="button"
          className="whitespace-nowrap"
        />
      </div>
    </form>
  );
}
