import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import TextareaMain from "../Textarea/TextareaMain";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";

export default function FormConctac() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.loading"));

    try {
      const response = await api.post(
        "/contact/sendMessage",
        { message },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );

      const result = response.data;

      if (
        result &&
        result.message &&
        typeof result.message === "string" &&
        result.message.trim().length > 0
      ) {
        toast.dismiss(loadingToast);
        toast.success(t("toast.success"));

        setTimeout(() => {
          navigate("/profil"); // l'itinéraire de votre choix
        }, 2000); // 2000ms = 2s
      } else {
        throw new Error("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  max-w-lg mx-auto bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl px-6 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <TextareaMain
          label={t("input.label.writing")}
          placeholder={t("input.placeholder.writing")}
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="mr-2">
          <BtnMain type="submit" label={t("Button.send")} />
        </div>
        <BtnNavLink link="/profil" label={t("Button.comeback")} />
      </div>
      <Toaster />
    </form>
  );
}
