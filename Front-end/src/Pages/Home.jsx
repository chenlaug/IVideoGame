import BtnNavLink from "../Components/Btn/BtnNavLink";
import ryuKen from "../Image/ryu-ken.gif";
import { useTranslation } from "react-i18next";

/**
 * Le composant `Home` sert de page d'accueil pour l'application.
 * 
 * Il affiche un message de bienvenue, une brève description et des boutons pour se connecter ou créer un compte. 
 * Une image emblématique de Ryu et Ken est également affichée pour enrichir visuellement la page.
 * 
 * Le contenu textuel de la page est internationalisé, ce qui signifie que les textes peuvent être traduits en différentes langues en fonction des paramètres de localisation de l'utilisateur.
 * 
 * @returns {JSX.Element} - La page d'accueil avec des options de connexion et d'inscription, ainsi qu'une image décorative.
 */

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col t6 items-center justify-center h min-h-screen">
        <h1 className="text-6xl font-titre text-light-TBlack dark:text-dark-TWhite mb-4">
          {t("home.title")}
        </h1>
        <p className="text-2xl font-text text-light-TBlack dark:text-dark-TWhite mb-6">
          {t("home.Paraphrase")}
        </p>

        <div className="flex items-center justify-center">
          <div className="mr-2">
            <BtnNavLink link="/connect" label={t("Button.connect")} />
          </div>
          <BtnNavLink link="/create-account" label={t("Button.Register")} />
        </div>
        <img src={ryuKen} alt="Ryu et Ken" className="my-4" />
      </div>
    </>
  );
}
