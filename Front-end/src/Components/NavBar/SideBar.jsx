import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Kirky from "../../Image/kirby-deaf.gif";
import { links } from "../../Utils/tableauOptionSelect";
import PropTypes from "prop-types";

SideBar.propTypes = {
  hovered: PropTypes.bool.isRequired,
  setHovered: PropTypes.func.isRequired,
};

/**
 * Composant `SideBar` qui affiche une barre latérale de navigation dans l'application.
 * Affiche des liens de navigation qui sont obtenus depuis un tableau de liens `links`.
 * La taille de la barre latérale peut être ajustée en survolant avec la souris grâce aux états `hovered` et `setHovered`.
 * Utilise également le hook `useTranslation` pour la traduction des noms des liens.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {boolean} props.hovered - Indique si la barre latérale doit être en état étendu ou réduit.
 * @param {Function} props.setHovered - Fonction pour changer l'état de `hovered`.
 * @returns {JSX.Element} Une barre latérale avec des liens de navigation et une image, dont la taille varie au survol.
 */

export default function SideBar({ hovered, setHovered }) {
  const { t } = useTranslation();

  const location = useLocation();
  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-200 ease-in-out transform bg-light-LightGray dark:bg-dark-BlackGray ${
        hovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col items-center">
        <img src={Kirky} alt="Kirky" className="my-4" />
        <div className="my-4 text-white">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                to={link.to}
                key={link.to}
                className={`flex items-center space-x-2 my-1 ${
                  isActive
                    ? " text-light-TYellow "
                    : "text-light-TBlack dark:text-dark-TWhite"
                }`}
              >
                <span>{link.icon}</span>
                {hovered && <span>{t(link.name)}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
