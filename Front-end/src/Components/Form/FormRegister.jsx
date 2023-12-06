import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import BtnShowPasword from "../Btn/BtnShowPasword";

export default function FormRegister() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error(t("toast.error"));
      return;
    }

    const loadingToast = toast.loading(t("toast.loading"));
    try {
      const data = {
        lastName,
        firstName,
        phone,
        birthday,
        email,
        password,
      };

      await api.post("/user/signIn", data);
      toast.dismiss(loadingToast);
      toast.success(t("toast.success"));
      setTimeout(() => {
        navigate("/connect");
      }, 2000);
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
      className="w-full max-w-lg mx-auto bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <InputMain
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          label={t("input.label.nom")}
          placeholder={t("input.placeholder.nom")}
          id="lastName"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          label={t("input.label.firstName")}
          placeholder={t("input.placeholder.firstName")}
          id="firstName"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          label={t("input.label.phone")}
          placeholder={t("input.placeholder.phone")}
          id="phone"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          label={t("input.label.birthday")}
          placeholder={t("input.placeholder.birthday")}
          id="birthday"
        />
      </div>
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
      <div className="mb-4">
        <InputMain
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label={t("input.label.password")}
          placeholder={t("input.placeholder.password")}
          id="password"
        />
      </div>
      <div className=" mb-6">
        <InputMain
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label={t("input.label.confirmPassword")}
          placeholder={t("input.placeholder.confirmPassword")}
          id="confirmpassword"
        />
        <div className=" flex items-center justify-center mt-2">
          <BtnShowPasword showPassword={showPassword} action={handlePassword} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <BtnMain type="submit" label={t("Button.Register")} />
      </div>
      <Toaster />
    </form>
  );
}
