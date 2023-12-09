import { Navigate, useLocation } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import PropTypes from 'prop-types';

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

/**
 * Un composant de route basé sur les rôles pour gérer l'accès à certaines parties de l'application.
 * Il utilise l'authentification et les rôles de l'utilisateur pour déterminer l'accès.
 *
 * @component
 * @param {Object} props - Les propriétés passées au composant RoleBasedRoute.
 * @param {React.ReactNode} props.children - Les composants enfants qui seront rendus si l'accès est autorisé.
 * @param {string} [props.role] - Le rôle requis pour accéder à la route. Si non spécifié, tous les utilisateurs authentifiés y ont accès.
 *
 * @returns {React.ReactNode} - Rendu conditionnel : si l'utilisateur est authentifié (et possède le rôle requis si spécifié),
 * retourne les enfants ; sinon, redirige vers la page d'accueil.
 *
 * @example
 * // Route accessible uniquement par les utilisateurs authentifiés avec le rôle 'admin'.
 * <RoleBasedRoute role="admin">
 *   <AdminPanel />
 * </RoleBasedRoute>
 *
 * @example
 * // Route accessible par tous les utilisateurs authentifiés, peu importe leur rôle.
 * <RoleBasedRoute>
 *   <UserProfile />
 * </RoleBasedRoute>
 */

function RoleBasedRoute({ children, role }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const authState = useAuthUser();

  // Vérifie si l'utilisateur est authentifié
  const isAuthorized = isAuthenticated() && authState();

  // Si un rôle est spécifié, vérifie si l'utilisateur a ce rôle
  // Notez l'ajout de la vérification authState pour éviter les erreurs
  const hasRequiredRole =
    role && authState() ? authState().role === role : true;

  // Autorise l'accès si l'utilisateur est authentifié et, si un rôle est spécifié, a le rôle requis
  // Sinon, redirige vers la page d'accueil
  return isAuthorized && hasRequiredRole ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default RoleBasedRoute;
