import { useTranslation } from "react-i18next";
import Iamlost from "../Image/john-travolta-lost.gif";
import BackButton from "../Components/Btn/BackButton";

/**
 * Le composant `PageNotFound` est utilisé pour afficher une page d'erreur 404 (Page non trouvée).
 * 
 * Cette page affiche un message d'erreur indiquant à l'utilisateur qu'il s'est perdu ou que la page qu'il recherche n'existe pas.
 * Elle inclut également une image humoristique (John Travolta perdu) pour alléger l'expérience utilisateur.
 * Un bouton `BackButton` est fourni pour permettre à l'utilisateur de revenir facilement à la page d'accueil.
 * 
 * L'internationalisation est gérée via l'hook `useTranslation` de `react-i18next`, permettant d'afficher les textes dans la langue choisie par l'utilisateur.
 * 
 * @returns {JSX.Element} - Un composant qui affiche la page d'erreur 404 avec un message, une image et un bouton de retour.
 */

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-light-White dark:bg-dark-Black">
      <h1 className="text-6xl font-bold text-light-TBlack dark:text-dark-TWhite">
        {t("notFound.title")}
      </h1>
      <h2 className="mt-2 text-xl text-light-TBlack dark:text-dark-TWhite">
        {t("notFound.title2")}
      </h2>
      <img src={Iamlost} alt="Iamlost" className="w-64 h-64 my-8" />
      <BackButton label={t("Button.BackHomepage")} />
    </div>
  );
}
