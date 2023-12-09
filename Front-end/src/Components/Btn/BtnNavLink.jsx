import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

BtnNavLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  link: PropTypes.string.isRequired,
};

/**
 * Composant `BtnNavLink` qui crée un lien de navigation stylisé avec React Router.
 * Ce composant accepte une étiquette (label) et une destination de lien (link).
 *
 * @param {Object} props - Les props passées au composant.
 * @param {string|Object} props.label - Le texte ou l'élément JSX à afficher comme contenu du lien.
 * @param {string} props.link - L'URL de destination pour le lien de navigation.
 * @returns {JSX.Element} Un élément NavLink JSX avec des styles conditionnels basés sur l'état actif.
 */

export default function BtnNavLink({ link, label }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `inline-block bg-light-Yellow ${
          isActive ? 'text-dark-TWhite' : 'text-light-TBleu '
        } hover:bg-light-VCYellow text-center font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`
      }
    >
      {label}
    </NavLink>
  );
}
