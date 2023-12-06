import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";

export default function FormForgotPassword() {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();


  const handleSubmit = async e => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.loading"));
    try {
      await api.post("/user/requestPasswordReset", { email });
      toast.dismiss(loadingToast);
      toast.success(t("toast.success"));
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl px-6 pt-6 pb-8 mb-4"
    >
      <div className="mb-6">
        <InputMain
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          label={t("input.label.email")}
          placeholder={t("input.placeholder.email")}
          id="email"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="mr-2">
          <BtnMain label={t("Button.confirm")} type="submit" />
        </div>
        <BtnNavLink link="/connect" label={t("Button.comeback")} />
      </div>
      <Toaster />
    </form>
  );
}
