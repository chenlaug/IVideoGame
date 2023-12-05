/* eslint-disable react/prop-types */
import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";

export default function   FormAddCommentaire({
  gameId,
  setIsOpenCommentaire,
  currentCommentaire,
}) {
  const [note, setNote] = useState(
    currentCommentaire ? currentCommentaire.note : ""
  );
  const [contenu, setContenu] = useState(
    currentCommentaire ? currentCommentaire.contenu : ""
  );

  const authHeader = useAuthHeader();
  const handleCreate = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Chargement en cours...");
    try {
      const data = {
        note,
        contenu,
      };
      await api.post(`/comments/addComments/${gameId}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success("Successfully toasted!");
      setIsOpenCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("This didn't work.");
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Mise à jour en cours...");
    try {
      const data = {
        note,
        contenu,
      };
      await api.put(`/comments/updateComment/${currentCommentaire._id}`, data, {
        headers: {
          Authorization: authHeader(),
        },
      });
      toast.dismiss(loadingToast);
      toast.success("Commentaire mis à jour avec succès !");
      setIsOpenCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("La mise à jour a échoué.");
    }
  };

  const handleSubmit = e => {
    if (currentCommentaire) {
      handleUpdate(e);
    } else {
      handleCreate(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputMain
          value={contenu}
          onChange={e => setContenu(e.target.value)}
          type="text"
          label="Contenu"
          placeholder="Titre"
          id="description"
        />

        <InputMain
          value={note}
          onChange={e => setNote(e.target.value)}
          type="number"
          label="Note"
          max={10}
          min={0}
          placeholder="Titre"
          id="note"
        />
        <div className="mt-5">
          <BtnMain label="Création commentaire" type="submit" />
        </div>
      </form>
      <Toaster />
    </>
  );
}
