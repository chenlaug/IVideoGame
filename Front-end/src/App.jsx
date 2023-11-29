import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import LogIng from "./Pages/LogIng";
import Home from "./Pages/Home";
import ForgotPassword from "./Pages/ForgotPassword";
import Register from "./Pages/Register";
import ConfirmAccount from "./Pages/ConfirmAccount";
import Conctac from "./Pages/Conctac";
import PageNotFound from "./Pages/PageNotFound";
import Profil from "./Pages/Profil";
import NewPassword from "./Pages/NewPassword";
import Game from "./Pages/Game";
import Catalogue from "./Pages/Catalogue";
import JeuxFavori from "./Pages/JeuxFavori";
import Commentaire from "./Pages/Commentaire";
import AdminCommentaire from "./Pages/Admin/AdminCommentaire";
import AdminUtilisateur from "./Pages/Admin/AdminUtilisateur";
import AdminDevelppeur from "./Pages/Admin/AdminDevelppeur";
import AdminEditeur from "./Pages/Admin/AdminEditeur";
import ReceptionAdmin from "./Pages/Admin/ReceptionAdmin";
import TopNavBar from "./Components/NavBar/TopNavBar";

// eslint-disable-next-line react/prop-types
function RoleBasedRoute({ children, role }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  // Obtenir l'état d'authentification (qui contient le rôle)
  const authState = useAuthUser();

  // Vérifie si l'utilisateur est authentifié et a le bon rôle
  return isAuthenticated() && authState && authState.role === role ? (
    children
  ) : (
    <Navigate to="/connect" replace state={{ from: location }} />
  );
}
export default function App() {
  const isAuthenticated = useIsAuthenticated();
  const authState = useAuthUser();
  const location = useLocation();

  const noNavBarPaths = [
    "/",
    "/connect",
    "/password-forgotten",
    "/create-account",
    "/confirm-account/:token",
    "/password-reset/:token",
  ];

  const showNavBar = () => {
    return (
      isAuthenticated() &&
      authState().role === "user" &&
      !noNavBarPaths.includes(location.pathname)
    );
  };

  return (
    <div className="dark">
      <div className="bg-light-White dark:bg-dark-Black">
        {showNavBar() && <TopNavBar />}
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
              <RoleBasedRoute>
                <ReceptionAdmin />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/comment"
            element={
              <RoleBasedRoute>
                <AdminCommentaire />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/utilisateur"
            element={
              <RoleBasedRoute>
                <AdminUtilisateur />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/editeur"
            element={
              <RoleBasedRoute>
                <AdminEditeur />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/develppeur"
            element={
              <RoleBasedRoute>
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
