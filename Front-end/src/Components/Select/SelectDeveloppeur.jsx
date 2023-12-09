import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import PropTypes from "prop-types";

SelectDeveloppeur.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

/**
 * Composant `SelectDeveloppeur` qui fournit une liste déroulante des développeurs.
 * Charge les options des développeurs depuis une API et les affiche dans un menu déroulant.
 * Permet à l'utilisateur de sélectionner un développeur à partir de la liste.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.onChange - Fonction appelée lorsque l'utilisateur sélectionne un développeur dans la liste.
 * @param {string} props.value - La valeur actuelle sélectionnée pour le développeur.
 * @returns {JSX.Element} Un composant de sélection avec des options dynamiquement chargées pour les développeurs.
 */

export default function SelectDeveloppeur({ onChange, value }) {
  const authHeader = useAuthHeader();
  const [developpeur, setDeveloppeur] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/developpeur/getDeveloppeurs", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => setDeveloppeur(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <label className="mt-2 block text-sm font-medium text-gray-700">
        {t("input.label.Developer")}
      </label>

      <select
        onChange={onChange}
        value={value}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        <option value="">{t("input.placeholder.Developer")}</option>
        {developpeur.map((developpeur) => (
          <option key={developpeur._id} value={developpeur._id}>
            {developpeur.nom}
          </option>
        ))}
      </select>
    </>
  );
}
