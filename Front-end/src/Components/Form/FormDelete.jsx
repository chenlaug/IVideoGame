import BtnMain from "../Btn/BtnMain";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

FormDelete.propTypes = {
  no: PropTypes.func.isRequired,
  yes: PropTypes.func.isRequired,
};

export default function FormDelete({ no, yes }) {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("Modal.DeletionConfirmation")}</h2>
      <div className="flex justify-center space-x-5">
        <BtnMain label={t("text.yes")} type="button" onClick={yes} />
        <BtnMain label={t("text.no")} type="button" onClick={no} />
      </div>
    </>
  );
}
