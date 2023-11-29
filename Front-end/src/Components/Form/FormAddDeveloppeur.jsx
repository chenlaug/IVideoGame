/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";

export default function FormAddDeveloppeur({
  setIsOpenAddDeveloppeur,
  CurrentDeveloppeur,
}) {
  const [nom, setNom] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.nom : ""
  );
  const [pays, setPays] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.pays : ""
  );
  const [siteWeb, setSiteWeb] = useState(
    CurrentDeveloppeur ? CurrentDeveloppeur.siteWeb : ""
  );
  const authHeader = useAuthHeader();
  const handleSubmit = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Chargement en cours...");

    const data = {
      nom,
      pays,
      siteWeb,
    };

    try {
      if (CurrentDeveloppeur) {
        // If CurrentDeveloppeur is defined, update the user
        await api.put(
          `/developpeur/updateDeveloppeur/${CurrentDeveloppeur._id}`,
          data,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
      } else {
        // If CurrentDeveloppeur is undefined, create a new user
        await api.post("/developpeur/createDeveloppeur", data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      }

      toast.dismiss(loadingToast);
      toast.success("L'opération a réussi!");
      setIsOpenAddDeveloppeur(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("L'opération a échoué.");
    }
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={nom}
        onChange={e => setNom(e.target.value)}
        type="text"
        label="Nom de l'equipe de developpeur"
        placeholder="Nom"
        id="nom"
      />

      <InputMain
        value={pays}
        onChange={e => setPays(e.target.value)}
        type="text"
        label="Pays"
        placeholder="Pays"
        id="pays"
      />

      <InputMain
        value={siteWeb}
        onChange={e => setSiteWeb(e.target.value)}
        type="text"
        label="Site web de l'equipe de developpeur"
        placeholder="Site web de l'equipe de developpeur"
        id="siteWeb"
      />

      <BtnMain
        label={
          CurrentDeveloppeur
            ? "Modifiaction d'un developpeur"
            : "Creation d'un developpeur"
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
