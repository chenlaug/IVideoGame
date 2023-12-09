/**
 * Point d'entrée principal de l'application React.
 *
 * Ce fichier initialise l'application React et la rend dans le DOM. Il englobe l'application
 * avec les fournisseurs nécessaires pour la gestion de l'authentification et du routage.
 *
 * @module index
 *
 * @requires react - Le package React pour construire des interfaces utilisateur.
 * @requires react-dom - Le package ReactDOM pour interagir avec le DOM.
 * @requires react-router-dom - Fournit des capacités de routage pour les applications React.
 * @requires react-auth-kit - Fournit des outils pour gérer l'authentification dans les applications React.
 * @requires App - Le composant racine de l'application.
 * @requires index.css - Feuille de style principale de l'application.
 * @requires ./i18n - Configuration pour l'internationalisation.
 *
 * @example
 * // Rendu de l'application dans l'élément avec l'ID 'root' dans le DOM
 * ReactDOM.createRoot(document.getElementById("root")).render(
 *   <AuthProvider authType="cookie" authName="_auth" cookieDomain={window.location.hostname} cookieSecure={false}>
 *     <BrowserRouter>
 *       <React.StrictMode>
 *         <App />
 *       </React.StrictMode>
 *     </BrowserRouter>
 *   </AuthProvider>
 * );
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import App from './App.jsx';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider
    authType="cookie"
    authName="_auth"
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
);
