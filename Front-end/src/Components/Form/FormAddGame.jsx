import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import { useTranslation } from 'react-i18next';
import {
  optionPlatformes,
  optionTypeDeJeu,
  pegiRatings,
  optionModeMultijoueur,
} from '../../Utils/tableauOptionSelect';
import api from '../../Utils/api';
import InputMain from '../Input/InputMain';
import InputFile from '../Input/InputFile';
import BtnMain from '../Btn/BtnMain';
import SelectMain from '../Select/SelectMain';
import SelectEditeur from '../Select/SelectEditeur';
import SelectDeveloppeur from '../Select/SelectDeveloppeur';
import PropTypes from 'prop-types';

FormAddGame.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  listeGame: PropTypes.array.isRequired,
  setListeGame: PropTypes.func.isRequired,
  currentGame: PropTypes.object,
};

/**
 * Composant `FormAddGame` qui fournit un formulaire pour ajouter ou mettre à jour un jeu vidéo.
 * Le formulaire permet de saisir des informations détaillées sur le jeu, telles que le titre, la plateforme, la description,
 * la date de sortie, le développeur, l'éditeur, le type de jeu, la note, le site officiel, le lien de la bande-annonce,
 * le mode multijoueur, la classification PEGI et une image.
 * Selon qu'un jeu existant est fourni ou non, le formulaire servira à la création ou à la mise à jour des informations du jeu.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Function} props.setIsOpen - Fonction pour gérer l'état d'ouverture du formulaire.
 * @param {Array} props.listeGame - Liste des jeux à mettre à jour après la création ou la modification d'un jeu.
 * @param {Function} props.setListeGame - Fonction pour mettre à jour la liste des jeux.
 * @param {Object} [props.currentGame] - Les informations du jeu actuel à mettre à jour, s'il existe.
 * @returns {JSX.Element} Le formulaire pour ajouter ou mettre à jour les informations d'un jeu vidéo.
 */

export default function FormAddGame({
  setIsOpen,
  listeGame,
  setListeGame,
  currentGame,
}) {
  const [titre, setTitre] = useState(currentGame ? currentGame.titre : '');
  const [plateformes, setPlateformes] = useState(
    currentGame ? currentGame.plateformes : ''
  );
  const [description, setDescription] = useState(
    currentGame ? currentGame.description : ''
  );
  const [dateSortie, setDateSortie] = useState(
    currentGame
      ? new Date(currentGame.dateSortie).toISOString().split('T')[0]
      : ''
  );
  const [developpeur, setDeveloppeur] = useState(
    currentGame ? currentGame.developpeur : ''
  );
  const [editeur, setEditeur] = useState(
    currentGame ? currentGame.editeur : ''
  );
  const [typeDeJeu, setTypeDeJeu] = useState(
    currentGame ? currentGame.typeDeJeu : ''
  );
  const [note, setNote] = useState(currentGame ? currentGame.note : '');
  const [siteOfficial, setSiteOfficial] = useState(
    currentGame ? currentGame.siteOfficial : ''
  );
  const [linkTrailer, setLinkTrailer] = useState(
    currentGame ? currentGame.linkTrailer : ''
  );
  const [modeMultijoueur, setModeMultijoueur] = useState(
    currentGame ? currentGame.modeMultijoueur : ''
  );
  const [pegiImage, setPegiImage] = useState(
    currentGame ? currentGame.pegiImage : ''
  );
  const [image, setImage] = useState(currentGame ? currentGame.image : '');
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const authHeader = useAuthHeader();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t('toast.loading'));

    // Utilisation de FormData pour gérer les pièces jointes
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('plateformes', plateformes);
    formData.append('description', description);
    formData.append('dateSortie', dateSortie);
    formData.append('developpeur', developpeur);
    formData.append('editeur', editeur);
    formData.append('typeDeJeu', typeDeJeu);
    formData.append('note', note);
    formData.append('siteOfficial', siteOfficial);
    formData.append('linkTrailer', linkTrailer);
    formData.append('modeMultijoueur', modeMultijoueur);
    formData.append('pegiImage', pegiImage);
    if (image !== null) {
      formData.append('image', image);
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
          newGame,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        toast.dismiss(loadingToast);
        toast.success(t('toast.success'));
        setListeGame(
          listeGame.map((game) =>
            game.id === currentGame.id ? response.data : game
          )
        );
        if (image !== null) {
          const newFormData = new FormData();
          newFormData.append('image', image);

          const imageResponse = await api.put(
            `/videoGame/updateImageGame/${currentGame._id}`,
            newFormData,
            {
              headers: {
                Authorization: authHeader(),
              },
            }
          );

          // modifier le jeux dans la liste jeu avec la nouvelle image
          setListeGame(
            listeGame.map((game) =>
              game.id === currentGame.id ? imageResponse.data : game
            )
          );
        }
      } else {
        // Envoie les données du formulaire avec une requête POST
        response = await api.post('/videoGame/createGame', formData, {
          headers: {
            Authorization: authHeader(),
          },
        });
        toast.dismiss(loadingToast);
        toast.success(t('toast.success'));
        setListeGame([...listeGame, response.data]);
      }
      // Reset les champs du formulaire
      setTitre('');
      setPlateformes('');
      setDescription('');
      setDateSortie('');
      setDeveloppeur('');
      setEditeur('');
      setTypeDeJeu('');
      setNote('');
      setSiteOfficial('');
      setLinkTrailer('');
      setModeMultijoueur('');
      setPegiImage('');
      setImage(null);
      setIsOpen(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t('toast.error'));
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        type="text"
        label={t('input.label.title')}
        placeholder={t('input.placeholder.title')}
        id="description"
      />

      <SelectMain
        label={t('input.label.Platforms')}
        placeholder={t('input.placeholder.Platforms')}
        id="plateformes"
        onChange={(e) => setPlateformes(e.target.value)}
        value={plateformes}
        options={optionPlatformes}
      />

      <InputMain
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        label={t('input.label.Description')}
        placeholder={t('input.placeholder.Description')}
        id="description"
      />

      <div className="flex justify-between">
        <div className="mr-2 w-1/2">
          <InputMain
            value={note}
            onChange={(e) => setNote(e.target.value)}
            type="number"
            label={t('input.label.score')}
            placeholder={t('input.placeholder.score')}
            max={5}
            min={0}
            id="note"
          />
        </div>
        <div className="ml-2 w-1/2">
          <InputMain
            value={dateSortie}
            onChange={(e) => setDateSortie(e.target.value)}
            type="date"
            label={t('input.label.Release')}
            placeholder={t('input.placeholder.Release')}
            id="dateSortie"
          />
        </div>
      </div>

      <SelectDeveloppeur
        onChange={(e) => setDeveloppeur(e.target.value)}
        value={developpeur}
      />

      <SelectEditeur
        onChange={(e) => setEditeur(e.target.value)}
        value={editeur}
      />

      <SelectMain
        label={t('input.label.TypeGame')}
        placeholder={t('input.placeholder.TypeGame')}
        id="typeDeJeu"
        onChange={(e) => setTypeDeJeu(e.target.value)}
        value={typeDeJeu}
        options={optionTypeDeJeu}
      />

      <InputMain
        value={siteOfficial}
        onChange={(e) => setSiteOfficial(e.target.value)}
        type="text"
        label={t('input.label.officialSite')}
        placeholder={t('input.placeholder.officialSite')}
        id="siteOfficial"
      />

      <InputMain
        value={linkTrailer}
        onChange={(e) => setLinkTrailer(e.target.value)}
        type="text"
        label={t('input.label.officialSite')}
        placeholder={t('input.placeholder.officialSite')}
        id="linkTrailer"
      />

      <InputFile
        label={t('input.label.gameImage')}
        placeholder={t('input.placeholder.gameImage')}
        id="image"
        required={!currentGame}
        onChange={handleFileChange}
      />

      <SelectMain
        label={t('input.label.multiplayerMode')}
        placeholder={t('input.placeholder.multiplayerMode')}
        id="modeMultijoueur"
        onChange={(e) => setModeMultijoueur(e.target.value)}
        value={modeMultijoueur}
        options={optionModeMultijoueur}
      />

      <SelectMain
        label={t('input.label.Pegi')}
        placeholder={t('input.placeholder.Pegi')}
        id="pegiImage"
        onChange={(e) => setPegiImage(e.target.value)}
        value={pegiImage}
        options={pegiRatings}
      />

      <BtnMain
        label={currentGame ? t('Button.modify') : t('Button.add')}
        type="submit"
      />
      <Toaster />
    </form>
  );
}
