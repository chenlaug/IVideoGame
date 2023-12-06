/* eslint-disable react/prop-types */
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.loading"));

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
      toast.success(t("toast.success"));
      setIsOpenAddEditeur(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        type="text"
        label={t("input.label.developerPublishe")}
        placeholder={t("input.placeholder.developerPublishe")}
        id="nom"
      />

      <InputMain
        value={pays}
        onChange={(e) => setPays(e.target.value)}
        type="text"
        label={t("input.label.country")}
        placeholder={t("input.placeholder.country")}
        id="pays"
      />

      <InputMain
        value={siteWeb}
        onChange={(e) => setSiteWeb(e.target.value)}
        type="text"
        label={t("input.label.PublisherWebsite")}
        placeholder={t("input.placeholder.PublisherWebsite")}
        id="siteWeb"
      />

      <BtnMain
        label={
          CurrentEditeur
            ? t("Button.editingEditor")
            : t("Button.creatingEditor")
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
