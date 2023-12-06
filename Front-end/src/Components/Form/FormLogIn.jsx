import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";
import BtnShowPasword from "../Btn/BtnShowPasword";

export default function FormLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.loading"));

    try {
      const response = await api.post("/user/login", { email, password });
      const { token, role } = response.data; // récupère le token et le role de la réponse

      if (token && typeof token === "string" && token.trim().length > 0) {
        toast.dismiss(loadingToast);
        signIn({
          token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email, role }, // ajoute le rôle à l'état d'authentification
        });
        toast.success(t("toast.success"));

        // Redirige en fonction du rôle
        if (role === "admin") {
          navigate("/admin/game");
        } else {
          navigate("/profil");
        }
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xs mx-auto bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl px-6 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <InputMain
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label={t("input.label.email")}
          placeholder={t("input.placeholder.email")}
          id="email"
        />
      </div>
      <div className="flex mb-6">
        <div className="mr-4">
          <InputMain
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label={t("input.label.password")}
            placeholder={t("input.placeholder.password")}
            id="password"
          />
        </div>
        <BtnShowPasword showPassword={showPassword} action={handlePassword} />
      </div>
      <div className="flex items-center justify-between">
        <div className="mr-2">
          <BtnMain type="submit" label={t("Button.connect")} />
        </div>
        <BtnNavLink
          link="/password-forgotten"
          label={t("Button.forgotPassword")}
        />
      </div>
      <Toaster />
    </form>
  );
}
