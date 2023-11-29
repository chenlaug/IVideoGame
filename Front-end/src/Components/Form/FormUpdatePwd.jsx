/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import BtnMain from "../Btn/BtnMain";
import InputMain from "../Input/InputMain";
import api from "../../Utils/api";
import BtnShowPasword from "../Btn/BtnShowPasword";

export default function FormUpdatePwd({ setIsOpenUpdatePwd, CurrentUser }) {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const authHeader = useAuthHeader();
  const handleSubmit = async e => {
    e.preventDefault();
    if (!(password === confirmpassword)) {
      toast.error("L'opération a échoué.");
    }
    const loadingToast = toast.loading("Chargement en cours...");

    const data = {
      password,
    };

    try {
      // eslint-disable-next-line react/prop-types
      await api.put(`/user/updateUser/${CurrentUser._id}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });

      toast.dismiss(loadingToast);
      toast.success("L'opération a réussi!");
      setIsOpenUpdatePwd(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("L'opération a échoué.");
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
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label="Mot de passe"
          placeholder="**********"
          id="password"
        />
      </div>

      <div className="flex mb-2">
        <div className="mr-2">
          <InputMain
            value={confirmpassword}
            onChange={e => setConfirmpassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label="Confirme mot de passe"
            placeholder="**********"
            id="confirmpassword"
          />
        </div>
        <BtnShowPasword showPassword={showPassword} action={handlePassword} />
      </div>
      <BtnMain label="Change le mot de passe." type="submit" />
      <Toaster />
    </form>
  );
}
