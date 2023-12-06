/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";
import InputMain from "../Input/InputMain";
import BtnShowPasword from "../Btn/BtnShowPasword";

export default function FormNewPassword({
  setNewPassword,
  setConfirmPassword,
  handleSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="mt-8 space-y-6 px-6 pt-6 pb-8" onSubmit={handleSubmit}>
      <div className="rounded-md">
        <div>
          <InputMain
            onChange={(e) => setNewPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label={t("input.label.newPassword")}
            placeholder={t("input.placeholder.newPassword")}
            id="password"
          />
        </div>
        <div>
          <InputMain
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label={t("input.label.confirmPassword")}
            placeholder={t("input.placeholder.confirmPassword")}
            id="confirm-password"
          />
        </div>
        <div className="text-center mt-2">
          <BtnShowPasword showPassword={showPassword} action={handlePassword} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="mr-2">
          <BtnMain label={t("Button.resetPassword")} type="submit" />
        </div>
        <BtnNavLink link="/" label={t("Button.comeback")} />
      </div>
    </form>
  );
}
