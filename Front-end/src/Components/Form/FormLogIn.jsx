import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";
import BtnShowPasword from "../Btn/BtnShowPasword";

export default function FormLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Chargement en cours...");

    try {
      const response = await api.post("/user/login", { email, password });
      const { token, role } = response.data; // récupère le token et le role de la réponse

      if (token && typeof token === "string" && token.trim().length > 0) {
        toast.dismiss(loadingToast);
        signIn({
          token,
          expiresIn: 10800,
          tokenType: "Bearer",
          authState: { email, role }, // ajoute le rôle à l'état d'authentification
        });
        toast.success("Successfully toasted!");
        navigate("/profil");
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "An error occurred");
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
          onChange={e => setEmail(e.target.value)}
          type="email"
          label="Email"
          placeholder="Email"
          id="email"
        />
      </div>
      <div className="flex mb-6">
        <div className="mr-4">
          <InputMain
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            label="Mot de passe"
            placeholder="**********"
            id="password"
          />
        </div>
        <BtnShowPasword showPassword={showPassword} action={handlePassword} />
      </div>
      <div className="flex items-center justify-between">
        <div className="mr-2">
          <BtnMain type="submit" label="Se connecter" />
        </div>
        <BtnNavLink link="/password-forgotten" label="Mot de passe oublié ?" />
      </div>
      <Toaster />
    </form>
  );
}
