import { useTranslation } from "react-i18next";

/**
 * Composant `Selectlanguage` permettant de changer la langue de l'interface utilisateur.
 * Utilise la bibliothèque `i18n` pour gérer le changement de langue.
 * Fournit un menu déroulant pour sélectionner la langue souhaitée (actuellement supporte le français et l'anglais).
 *
 * @returns {JSX.Element} Un menu déroulant pour sélectionner la langue de l'interface utilisateur.
 */

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
