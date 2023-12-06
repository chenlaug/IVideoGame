import { useTranslation } from "react-i18next";
import Iamlost from "../Image/john-travolta-lost.gif";
import BackButton from "../Components/Btn/BackButton";

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
