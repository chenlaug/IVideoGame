import BtnNavLink from "../Components/Btn/BtnNavLink";
import ryuKen from "../Image/ryu-ken.gif";

export default function Home() {
  return (
    <>
      <div className="flex flex-col t6 items-center justify-center h min-h-screen">
        <h1 className="text-6xl font-titre text-light-TBlack dark:text-dark-TWhite mb-4">
          Bienvenue sur notre site
        </h1>
        <p className="text-2xl font-text text-light-TBlack dark:text-dark-TWhite mb-6">
          Ici, vous pouvez trouver toutes les informations dont vous avez besoin
          !
        </p>
        <div className="flex items-center justify-center">
          <div className="mr-2">
            <BtnNavLink link="/connect" label="Se connecter" />
          </div>
          <BtnNavLink link="/create-account" label="S'inscrire" />
        </div>
        <img src={ryuKen} alt="Ryu et Ken" className="my-4" />
      </div>
    </>
  );
}
