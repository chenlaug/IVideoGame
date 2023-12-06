import BtnNavLink from "../Components/Btn/BtnNavLink";
import ryuKen from "../Image/ryu-ken.gif";
import { useTranslation } from "react-i18next";

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
