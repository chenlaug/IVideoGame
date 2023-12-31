import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthHeader } from 'react-auth-kit';
import api from '../Utils/api';
import { useTranslation } from 'react-i18next';
import AddCommentaire from '../Components/Modal/AddCommentaire';
import { formatDate } from '../Utils/changeDate';
import BtnMain from '../Components/Btn/BtnMain';
import CardCommentaire from '../Components/Card/CardCommentaire';

/**
 * Le composant `Game` est utilisé pour afficher les détails d'un jeu vidéo spécifique.
 *
 * Il récupère les informations du jeu et les commentaires associés en fonction de l'ID du jeu passé en paramètre via les `useParams`. Les données sont récupérées via des appels API.
 *
 * Le composant gère également l'ajout de commentaires et l'ajout du jeu aux favoris. Un utilisateur peut voir les détails du jeu, comme le titre, la description, les plateformes, le développeur, l'éditeur, etc.
 *
 * Des boutons sont fournis pour visiter le site officiel du jeu, ajouter le jeu aux favoris et ajouter un commentaire.
 *
 * @returns {JSX.Element} - Le composant qui affiche les détails du jeu vidéo et les commentaires associés.
 */

export default function Game() {
  const [game, setGame] = useState(null);
  const [isOpenCommentaire, setIsOpenCommentaire] = useState(false);
  const [gameId, setGameId] = useState('');
  const [comments, setComments] = useState([]);
  const { idGame } = useParams();
  const authHeader = useAuthHeader();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get(`/videoGame/getGame/${idGame}`, {
          headers: {
            Authorization: authHeader(),
          },
        });
        setGame(response.data);
      } catch (error) {
        toast.error(t('toast.error'));
      }
    };
    fetchGame();
  }, [idGame]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/getGameComments/${idGame}`, {
          headers: {
            Authorization: authHeader(),
          },
        });
        setComments(response.data);
      } catch (error) {
        toast.error(t('toast.error'));
      }
    };
    fetchComments();
  }, [idGame]);

  let embedUrl;
  if (game && game.linkTrailer) {
    const url = new URL(game.linkTrailer);
    const videoId = url.pathname.split('/')[1]; // Extrait l'ID de la vidéo du chemin de l'URL
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  if (!game) {
    return <div>{t('toast.loading')}</div>;
  }
  const openModalAddCommentaire = (id) => {
    setIsOpenCommentaire(true);
    setGameId(id);
  };

  const addToFavorites = async (id) => {
    try {
      await api.post(
        `/user/addToFavorites/${id}`,
        {},
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      toast.success(t('toast.success'));
    } catch (error) {
      toast.error(t('toast.error'));
    }
  };
  return (
    <div className="flex justify-center items-center overflow-y-auto min-h-screen">
      <div className="shadow-inherit my-6 mx-auto p-10 text-light-TBlack dark:text-dark-TWhite max-w-4xl w-full">
        <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inner p-10 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold font-titre mb-4">{game.titre}</h1>
            <div className="mx-5">
              <img
                className="inline-block mx-2"
                src={`http://localhost:5000/imagePegi/${
                  game.pegiImage ? game.pegiImage : 'default.png'
                }`}
                alt="PEGI Rating"
                style={{ width: '100px', height: '100px' }}
              />

              <img
                className="inline-block"
                src={`http://localhost:5000/${game.image}`}
                alt={game.titre}
                style={{ width: '150px', height: '100px' }}
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold font-text">
              {game.description}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-bold">
              {t('game.Platforms')}
              <span className="font-normal">{game.plateformes}</span>
            </p>
            <p className="font-bold">
              {t('game.Developer')}
              <span className="font-normal">
                <a
                  href={game.developpeur.siteWeb}
                  target="_blank"
                  className="hover:text-light-Yellow"
                  rel="noreferrer"
                >
                  {game.developpeur.nom}
                </a>
              </span>
            </p>
            <p className="font-bold">
              {t('game.Publisher')}
              <span className="font-normal">
                <a
                  href={game.editeur.siteWeb}
                  target="_blank"
                  className="hover:text-light-Yellow"
                  rel="noreferrer"
                >
                  {game.editeur.nom}
                </a>
              </span>
            </p>
            <p className="font-bold">
              {t('game.TypeGame')}
              <span className="font-normal">{game.typeDeJeu}</span>
            </p>
            <p className="font-bold">
              {t('game.Note')}
              <span className="font-normal">{game.note}</span>
            </p>
            <p className="font-bold">
              {t('game.Multiplayer')}
              <span className="font-normal">
                {game.multiplayerMode ? 'Oui' : 'Non'}
              </span>
            </p>
            <p className="font-bold mb-2">
              {t('game.Release')}
              <span className="font-normal">{formatDate(game.dateSortie)}</span>
            </p>
          </div>
          {embedUrl && (
            <div className="aspect-auto relative w-full max-h-full overflow-hidden">
              <iframe
                className="aspect-auto w-full rounded-lg"
                width="560"
                height="315"
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href={game.siteOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-light-Yellow text-light-TBleu hover:bg-light-VCYellow text-center font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              {t('game.VisitWebsite')}
            </a>
            <BtnMain
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              }
              type="button"
              onClick={() => addToFavorites(game._id)}
            />
            <BtnMain
              label={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              }
              type="button"
              onClick={() => openModalAddCommentaire(game._id)}
            />
          </div>
        </div>
        <CardCommentaire comments={comments} />
        <Toaster />
        <AddCommentaire
          isOpenCommentaire={isOpenCommentaire}
          setIsOpenCommentaire={setIsOpenCommentaire}
          gameId={gameId}
        />
      </div>
    </div>
  );
}
