import { useSignOut } from "react-auth-kit";
import sonicandTails from "../../Image/SonicandTails.gif";
import marioLuigi from "../../Image/mario-luigi.gif";
import mortalKombat from "../../Image/mortal-kombat.gif";
import megaman from "../../Image/megaman.gif";
import { useTranslation } from "react-i18next";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";
import Selectlanguage from "../../Components/Select/Selectlanguage";

export default function TopNavBar({ theme, setTheme }) {
  const { t } = useTranslation();
  const signOut = useSignOut();

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-light-LightGray dark:bg-dark-BlackGray shadow-inner">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 mb-4 md:mb-0">
        <img
          src={sonicandTails}
          alt="sonicandTails"
          className="flex-shrink-0 object-cover h-12 mb-2 md:mb-0"
        />
        <div className="text-white mb-2 md:mb-0">
          <h1 className="text-xl md:text-2xl cursor-none">IVIDEOGAME</h1>
        </div>
        <img
          src={megaman}
          alt="megaman"
          className="flex-shrink-0 object-cover h-12"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
          <img
            src={mortalKombat}
            alt="mortalKombat"
            className="flex-shrink-0 object-cover h-12 hidden md:block"
          />
          <BtnNavLink link="/profil" label={t("TopNavBar.profile")} />
          <BtnNavLink link="/catalogue" label={t("TopNavBar.Catalogue")} />
          <BtnNavLink link="/contact" label={t("TopNavBar.Contact")} />
          <BtnNavLink
            link="/favourites"
            label={t("TopNavBar.FavouriteGames")}
          />
          <BtnNavLink link="/comment" label={t("TopNavBar.CommentList")} />
        </div>
        <BtnMain
          label={theme ? t("TopNavBar.Light") : t("TopNavBar.Dark")}
          type="button"
          onClick={() => setTheme((prev) => !prev)}
        />
        <Selectlanguage />
        <BtnMain
          label={t("TopNavBar.Disconnect")}
          type="button"
          onClick={() => signOut()}
        />
        <img
          src={marioLuigi}
          alt="marioLuigi"
          className="flex-shrink-0 object-cover h-12 hidden md:block"
        />
      </div>
    </nav>
  );
}
