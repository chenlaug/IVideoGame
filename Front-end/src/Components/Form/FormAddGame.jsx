/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
/* import { useAuthHeader } from "react-auth-kit"; */
import {
  optionPlatformes,
  optionDeveloppeur,
  optionEditeur,
  optionTypeDeJeu,
  pegiRatings,
  optionModeMultijoueur,
} from "../../Utils/tableauOptionSelect";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import InputFile from "../Input/InputFile";
import BtnMain from "../Btn/BtnMain";
import SelectMain from "../Select/SelectMain";

export default function FormAddGame({
  setIsOpen,
  listeGame,
  setListeGame,
  currentGame,
}) {
  const [titre, setTitre] = useState(currentGame ? currentGame.titre : "");
  const [plateformes, setPlateformes] = useState(
    currentGame ? currentGame.plateformes : ""
  );
  const [description, setDescription] = useState(
    currentGame ? currentGame.description : ""
  );
  const [dateSortie, setDateSortie] = useState(
    currentGame
      ? new Date(currentGame.dateSortie).toISOString().split("T")[0]
      : ""
  );
  const [developpeur, setDeveloppeur] = useState(
    currentGame ? currentGame.developpeur : ""
  );
  const [editeur, setEditeur] = useState(
    currentGame ? currentGame.editeur : ""
  );
  const [typeDeJeu, setTypeDeJeu] = useState(
    currentGame ? currentGame.typeDeJeu : ""
  );
  const [note, setNote] = useState(currentGame ? currentGame.note : "");
  const [siteOfficial, setSiteOfficial] = useState(
    currentGame ? currentGame.siteOfficial : ""
  );
  const [linkTrailer, setLinkTrailer] = useState(
    currentGame ? currentGame.linkTrailer : ""
  );
  const [modeMultijoueur, setModeMultijoueur] = useState(
    currentGame ? currentGame.modeMultijoueur : ""
  );
  const [pegiImage, setPegiImage] = useState(
    currentGame ? currentGame.pegiImage : ""
  );
  const [image, setImage] = useState(currentGame ? currentGame.image : "");

  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  // eslint-disable-next-line no-underscore-dangle
  const handleSubmit = async e => {
    e.preventDefault();
    const loadingToast = toast.loading("Chargement en cours...");

    // Utilisation de FormData pour gérer les pièces jointes
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("plateformes", plateformes);
    formData.append("description", description);
    formData.append("dateSortie", dateSortie);
    formData.append("developpeur", developpeur);
    formData.append("editeur", editeur);
    formData.append("typeDeJeu", typeDeJeu);
    formData.append("note", note);
    formData.append("siteOfficial", siteOfficial);
    formData.append("linkTrailer", linkTrailer);
    formData.append("modeMultijoueur", modeMultijoueur);
    formData.append("pegiImage", pegiImage);
    if (image !== null) {
      formData.append("image", image);
    }

    try {
      let response;
      if (currentGame) {
        const newGame = {
          titre,
          plateformes,
          description,
          dateSortie,
          developpeur,
          editeur,
          typeDeJeu,
          note,
          siteOfficial,
          linkTrailer,
          modeMultijoueur,
          pegiImage,
        };

        // modification
        response = await api.put(
          `/videoGame/updateGame/${currentGame._id}`,
          newGame
        );
        toast.dismiss(loadingToast);
        toast.success("Jeu modifié avec succès !");
        setListeGame(
          listeGame.map(game =>
            game.id === currentGame.id ? response.data : game
          )
        );
        if (image !== null) {
          const newFormData = new FormData();
          newFormData.append("image", image);
          const imageResponse = await api.put(
            `/videoGame/updateImageGame/${currentGame._id}`,
            newFormData
          );

          // Update the game in listeGame with the new image
          setListeGame(
            listeGame.map(game =>
              game.id === currentGame.id ? imageResponse.data : game
            )
          );
        }
      } else {
        // Envoie les données du formulaire avec une requête POST
        response = await api.post("/videoGame/createGame", formData);
        toast.dismiss(loadingToast);
        toast.success("Jeu ajouté avec succès !");

        setListeGame([...listeGame, response.data]);
      }
      // Reset les champs du formulaire
      setTitre("");
      setPlateformes("");
      setDescription("");
      setDateSortie("");
      setDeveloppeur("");
      setEditeur("");
      setTypeDeJeu("");
      setNote("");
      setSiteOfficial("");
      setLinkTrailer("");
      setModeMultijoueur("");
      setPegiImage("");
      setImage(null);
      setIsOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={titre}
        onChange={e => setTitre(e.target.value)}
        type="text"
        label="titre"
        placeholder="Titre"
        id="description"
      />

      <SelectMain
        label="Plateformes"
        id="plateformes"
        onChange={e => setPlateformes(e.target.value)}
        value={plateformes}
        options={optionPlatformes}
        placeholder="---Sélectionnez une plateforme.---"
      />

      <InputMain
        value={description}
        onChange={e => setDescription(e.target.value)}
        type="text"
        label="Description"
        placeholder="Titre"
        id="description"
      />

      <div className="flex justify-between">
        <div className="mr-2 w-1/2">
          <InputMain
            value={note}
            onChange={e => setNote(e.target.value)}
            type="number"
            label="Min: 1 - Max: 5"
            max={5}
            min={0}
            placeholder="Note"
            id="note"
          />
        </div>
        <div className="ml-2 w-1/2">
          <InputMain
            value={dateSortie}
            onChange={e => setDateSortie(e.target.value)}
            type="date"
            label="Date de sortie"
            placeholder="Date de sortie"
            id="dateSortie"
          />
        </div>
      </div>

      <SelectMain
        label="Developpeur"
        id="developpeur"
        onChange={e => setDeveloppeur(e.target.value)}
        value={developpeur}
        options={optionDeveloppeur}
        placeholder="---Sélectionnez un studio de développement.---"
      />

      <SelectMain
        label="Editeur"
        id="editeur"
        onChange={e => setEditeur(e.target.value)}
        value={editeur}
        options={optionEditeur}
        placeholder="---Sélectionnez un éditeur.---"
      />

      <SelectMain
        label="Type de jeu"
        id="typeDeJeu"
        onChange={e => setTypeDeJeu(e.target.value)}
        value={typeDeJeu}
        options={optionTypeDeJeu}
        placeholder="---Sélectionnez un type de jeu.---"
      />

      <InputMain
        value={siteOfficial}
        onChange={e => setSiteOfficial(e.target.value)}
        type="text"
        label="Site official"
        placeholder="Site official"
        id="siteOfficial"
      />

      <InputMain
        value={linkTrailer}
        onChange={e => setLinkTrailer(e.target.value)}
        type="text"
        label="Link Trailer"
        placeholder="lien vers le trailer"
        id="linkTrailer"
      />

      <InputFile
        label="Image du jeu"
        id="image"
        required={!currentGame}
        onChange={handleFileChange}
      />

      <SelectMain
        label="Mode multi-joueur"
        id="modeMultijoueur"
        onChange={e => setModeMultijoueur(e.target.value)}
        value={modeMultijoueur}
        options={optionModeMultijoueur}
        placeholder="---Sélectionnez un mode de jeux.---"
      />

      <SelectMain
        label="PEGI"
        id="pegiImage"
        onChange={e => setPegiImage(e.target.value)}
        value={pegiImage}
        options={pegiRatings}
        placeholder="---Sélectionnez un PEGI.---"
      />

      <BtnMain label={currentGame ? "Modifier" : "Ajouter"} type="submit" />
      <Toaster />
    </form>
  );
}
