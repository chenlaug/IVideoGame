import { useSignOut } from "react-auth-kit";
import sonicandTails from "../../Image/SonicandTails.gif";
import marioLuigi from "../../Image/mario-luigi.gif";
import mortalKombat from "../../Image/mortal-kombat.gif";
import megaman from "../../Image/megaman.gif";

import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";

export default function TopNavBar() {
  const signOut = useSignOut();
  return (
    <nav className="flex items-center justify-between p-4 bg-light-LightGray dark:bg-dark-BlackGray shadow-inner">
      <div className="flex items-center space-x-2">
        <img
          src={sonicandTails}
          alt="sonicandTails"
          className="flex-shrink-0 object-cover h-12"
        />
        <div className="text-white">
          <h1 className="text-2xl cursor-none">IVIDEOGAME</h1>
        </div>
        <img
          src={megaman}
          alt="megaman"
          className="flex-shrink-0 object-cover h-12"
        />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center space-x-4">
          <img
            src={mortalKombat}
            alt="mortalKombat"
            className="flex-shrink-0 object-cover h-12"
          />
          <BtnNavLink link="/profil" label="Profile" />
          <BtnNavLink link="/catalogue" label="Catalogue" />
          <BtnNavLink link="/contact" label="Contact" />
          <BtnNavLink link="/favourites" label="Jeux favoris" />
          <BtnNavLink link="/comment" label="Liste commentaire" />
        </div>
        <BtnMain label="Deconnection" type="button" onClick={() => signOut()} />
        <img
          src={marioLuigi}
          alt="marioLuigi"
          className="flex-shrink-0 object-cover h-12"
        />
      </div>
    </nav>
  );
}
