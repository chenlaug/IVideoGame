/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";

export default function FormAddEditeur({
  setIsOpenAddEditeur,
  CurrentEditeur,
}) {
  const [nom, setNom] = useState(CurrentEditeur ? CurrentEditeur.nom : "");
  const [pays, setPays] = useState(CurrentEditeur ? CurrentEditeur.pays : "");
  const [siteWeb, setSiteWeb] = useState(
    CurrentEditeur ? CurrentEditeur.siteWeb : ""
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
      if (CurrentEditeur) {
        // If CurrentEditeur is defined, update the user
        await api.put(`/editeur/updateEditeur/${CurrentEditeur._id}`, data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      } else {
        // If CurrentEditeur is undefined, create a new user
        await api.post("/editeur/createEditeur", data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      }

      toast.dismiss(loadingToast);
      toast.success("L'opération a réussi!");
      setIsOpenAddEditeur(false);
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
          CurrentEditeur ? "Modifiaction d'un éditeur" : "Creation d'un éditeur"
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
