import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../Utils/api";
import FormNewPassword from "../Components/Form/FormNewPassword";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const loadingToastId = toast.loading("Chargement...");
    try {
      const response = await api.post("/user/resetPassword", {
        token,
        newPassword,
      });
      toast.dismiss(loadingToastId);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/connect");
      }, 2000);
    } catch (error) {
      toast.dismiss(loadingToastId);

      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-4xl font-titre text-center text-light-TBlack dark:text-dark-TWhite mb-4">
            Réinitialiser le mot de passe
          </h2>
        </div>
        <FormNewPassword
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
}
