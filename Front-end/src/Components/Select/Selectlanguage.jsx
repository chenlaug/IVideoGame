import { useTranslation } from "react-i18next";

export default function Selectlanguage() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className={`bg-light-Yellow hover:bg-light-VCYellow  text-center font-medium y-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
    >
      <option value="fr">{t("TopNavBar.french")}</option>
      <option value="en">{t("TopNavBar.english")} </option>
    </select>
  );
}
