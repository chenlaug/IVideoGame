import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Utils/api";
import BtnNavLink from "../Components/Btn/BtnNavLink";

export default function ConfirmAccount() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/user/confirmAccount/${token}`)
      .then(res => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/connect");
        }, 2000); // 2000ms = 2s
      })
      .catch(err => {
        setError(JSON.stringify(err.response.data.message));
        setMessage("");
      });
  }, [token, navigate]); // Ajoutez history aux dépendances du useEffect

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl">
        {message && (
          <h1 className="text-green-500">
            Le token de validation est bon. Votre compte a donc été valide
          </h1>
        )}
        {error && (
          <h1 className="text-red-500">
            Le token de validation n&apos;est pas bon. Votre compte n&apos;a
            donc pas été valide
          </h1>
        )}
        <div className=" text-center">
          {error && (
            <BtnNavLink link="/create-account" label="Register again" />
          )}
        </div>
      </div>
    </div>
  );
}
