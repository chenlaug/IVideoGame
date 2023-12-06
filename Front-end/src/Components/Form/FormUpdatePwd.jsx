import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import BtnMain from "../Btn/BtnMain";
import InputMain from "../Input/InputMain";
import api from "../../Utils/api";
import BtnShowPasword from "../Btn/BtnShowPasword";
import PropTypes from "prop-types";

FormUpdatePwd.propTypes = {
  setIsOpenUpdatePwd: PropTypes.func.isRequired,
  CurrentUser: PropTypes.array,
};

export default function FormUpdatePwd({ setIsOpenUpdatePwd, CurrentUser }) {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();
  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(password === confirmpassword)) {
      toast.error(t("toast.error"));
    }
    const loadingToast = toast.loading(t("toast.error"));

    const data = {
      password,
    };

    try {
      await api.put(`/user/updateUser/${CurrentUser._id}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });

      toast.dismiss(loadingToast);
      toast.success(t("toast.success"));
      setIsOpenUpdatePwd(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className=" mb-2">
        <InputMain
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label={t("input.label.password")}
          placeholder={t("input.placeholder.password")}
          id="password"
        />
      </div>

      <div className="flex mb-2">
        <div className="mr-2">
          <InputMain
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label={t("input.label.confirmPassword")}
            placeholder={t("input.placeholder.confirmPassword")}
            id="confirmpassword"
          />
        </div>
        <BtnShowPasword showPassword={showPassword} action={handlePassword} />
      </div>
      <BtnMain label={t("Button.changePassword")} type="submit" />
      <Toaster />
    </form>
  );
}
