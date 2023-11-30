import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      toast.error("This didn't work.");
      return;
    }

    const loadingToast = toast.loading("Chargement en cours...");
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
      toast.success("Successfully toasted!");
      setTimeout(() => {
        navigate("/connect");
      }, 2000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("This didn't work.");
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
          label="Nom"
          placeholder="Nom"
          id="lastName"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          label="Prénom"
          placeholder="Prénom"
          id="firstName"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          label="Téléphone"
          placeholder="Téléphone"
          id="phone"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          label="Date de naissance"
          placeholder="Date de naissance"
          id="birthday"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          placeholder="Email"
          id="email"
        />
      </div>
      <div className="mb-4">
        <InputMain
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label="Mot de passe"
          placeholder="**********"
          id="password"
        />
      </div>
      <div className=" mb-6">
        <InputMain
          value={confirmpassword}
          onChange={(e) => setConfirmpassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          label="Confirme mot de passe"
          placeholder="**********"
          id="confirmpassword"
        />
        <div className=" flex items-center justify-center mt-2">
          <BtnShowPasword showPassword={showPassword} action={handlePassword} />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <BtnMain type="submit" label="Sinscrire" />
      </div>
      <Toaster />
    </form>
  );
}
