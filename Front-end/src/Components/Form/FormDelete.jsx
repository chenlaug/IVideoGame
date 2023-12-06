/* eslint-disable react/prop-types */
import BtnMain from "../Btn/BtnMain";
import { useTranslation } from "react-i18next";

export default function FormDelete({ no, yes }) {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("Modal.DeletionConfirmation")}</h2>
      <div className="flex justify-center space-x-5">
        <BtnMain label={t("Button.yes")} type="button" onClick={yes} />
        <BtnMain label={t("Button.no")} type="button" onClick={no} />
      </div>
    </>
  );
}
