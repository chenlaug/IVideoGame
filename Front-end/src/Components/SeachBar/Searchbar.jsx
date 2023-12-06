/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import BtnMain from "../Btn/BtnMain";
import InputMain from "../Input/InputMain";

export default function Searchbar({ query, handleSearch }) {
  const { t } = useTranslation();

  return (
    <form className="w-full sm:w-3/4 lg:w-1/2 xl:max-w-lg mx-auto">
      <div className="flex items-center border-b-2 border-light-Yellow py-2">
        <InputMain
          value={query}
          onChange={handleSearch}
          type="text"
          placeholder={t("placeholder.searchGame")}
          className="flex-grow"
        />

        <BtnMain
          label={t("Button.search")}
          type="button"
          className="whitespace-nowrap"
        />
      </div>
    </form>
  );
}
