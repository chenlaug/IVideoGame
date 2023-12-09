import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { useState } from 'react';
import LogIng from './Pages/LogIng';
import Home from './Pages/Home';
import ForgotPassword from './Pages/ForgotPassword';
import Register from './Pages/Register';
import ConfirmAccount from './Pages/ConfirmAccount';
import Conctac from './Pages/Conctac';
import PageNotFound from './Pages/PageNotFound';
import Profil from './Pages/Profil';
import NewPassword from './Pages/NewPassword';
import Game from './Pages/Game';
import Catalogue from './Pages/Catalogue';
import JeuxFavori from './Pages/JeuxFavori';
import Commentaire from './Pages/Commentaire';
import AdminCommentaire from './Pages/Admin/AdminCommentaire';
import AdminUtilisateur from './Pages/Admin/AdminUtilisateur';
import AdminDevelppeur from './Pages/Admin/AdminDevelppeur';
import AdminEditeur from './Pages/Admin/AdminEditeur';
import ReceptionAdmin from './Pages/Admin/ReceptionAdmin';
import TopNavBar from './Components/NavBar/TopNavBar';
import RoleBasedRoute from './Utils/RoleBasedRoute';

/**
 * Le composant principal de l'application qui gère le routage et l'affichage des pages.
 * Il utilise `Routes` et `Route` de `react-router-dom` pour définir les chemins d'accès aux différentes pages.
 * Il intègre également une gestion des rôles d'accès avec `RoleBasedRoute` pour certaines routes.
 *
 * @component
 * @returns {React.ReactNode} - Le rendu des routes et des composants de l'application.
 *
 * @example
 * // Dans index.js
 * ReactDOM.render(
 *   <React.StrictMode>
 *     <BrowserRouter>
 *       <AuthProvider>
 *         <App />
 *       </AuthProvider>
 *     </BrowserRouter>
 *   </React.StrictMode>,
 *   document.getElementById('root')
 * );
 *
 * @see {@link RoleBasedRoute}
 */

export default function App() {
  const [theme, setTheme] = useState(true);
  const isAuthenticated = useIsAuthenticated();
  const authState = useAuthUser();
  const location = useLocation();

  const noNavBarPaths = [
    '/',
    '/connect',
    '/password-forgotten',
    '/create-account',
    '/confirm-account/:token',
    '/password-reset/:token',
  ];

  const showNavBar = () => {
    const authStateData = authState();
    const userRole = authStateData ? authStateData.role : null;

    return (
      isAuthenticated() &&
      (userRole === 'user' || userRole === 'admin') &&
      !noNavBarPaths.includes(location.pathname)
    );
  };

  return (
    <div className={theme ? 'dark' : 'light'}>
      <div className="bg-light-White dark:bg-dark-Black">
        {showNavBar() && <TopNavBar theme={theme} setTheme={setTheme} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<LogIng />} />
          <Route path="/password-forgotten" element={<ForgotPassword />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="/password-reset/:token" element={<NewPassword />} />
          <Route
            path="/comment"
            element={
              <RoleBasedRoute>
                <Commentaire />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <RoleBasedRoute>
                <JeuxFavori />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/game/:idGame"
            element={
              <RoleBasedRoute>
                <Game />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/game"
            element={
              <RoleBasedRoute role={'admin'}>
                <ReceptionAdmin />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/comment"
            element={
              <RoleBasedRoute role={'admin'}>
                <AdminCommentaire />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/utilisateur"
            element={
              <RoleBasedRoute role={'admin'}>
                <AdminUtilisateur />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/editeur"
            element={
              <RoleBasedRoute role={'admin'}>
                <AdminEditeur />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/develppeur"
            element={
              <RoleBasedRoute role={'admin'}>
                <AdminDevelppeur />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <RoleBasedRoute>
                <Profil />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/catalogue"
            element={
              <RoleBasedRoute>
                <Catalogue />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <RoleBasedRoute>
                <Conctac />
              </RoleBasedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}
