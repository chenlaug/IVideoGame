import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import AddCommentaire from "../Components/Modal/AddCommentaire";
import api from "../Utils/api";
import { formatDate } from "../Utils/changeDate";
import BtnMain from "../Components/Btn/BtnMain";
import CardCommentaire from "../Components/Card/CardCommentaire";

export default function Game() {
  const [game, setGame] = useState(null);
  const [isOpenCommentaire, setIsOpenCommentaire] = useState(false);
  const [gameId, setGameId] = useState("");
  const [comments, setComments] = useState([]);
  const { idGame } = useParams();
  const authHeader = useAuthHeader();

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
        toast.error("An error occurred while fetching the game.");
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
        toast.error("An error occurred while fetching the comments.");
      }
    };
    fetchComments();
  }, [idGame]);

  let embedUrl;
  if (game && game.linkTrailer) {
    const url = new URL(game.linkTrailer);
    const videoId = url.searchParams.get("v");
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  if (!game) {
    return <div>Chargement du jeu...</div>;
  }
  const openModalAddCommentaire = (id) => {
    setIsOpenCommentaire(true);
    setGameId(id);
  };
  return (
    <div className="flex justify-center items-center w-screen overflow-y-auto min-h-screen">
      <div className="shadow-inherit overflow-hidden sm:rounded-lg p-6 text-light-TBlack dark:text-dark-TWhite">
        <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inne p-5 rounded-md max-w-lg mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold font-titre mb-4">{game.titre}</h1>
            <div>
              <img
                className="inline-block mr-2"
                src={`http://localhost:5000/${
                  game.pegiImage ? game.pegiImage : ""
                }`}
                alt="PEGI Rating"
                style={{ width: "50px", height: "50px" }}
              />
              <img
                className="inline-block"
                src={`http://localhost:5000/${game.image}`}
                alt={game.titre}
                style={{ width: "50px", height: "50px" }}
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
              Plateformes:
              <span className="font-normal">{game.plateformes}</span>
            </p>
            <p className="font-bold">
              Développeur:
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
              Éditeur:
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
              Type de jeu: <span className="font-normal">{game.typeDeJeu}</span>
            </p>
            <p className="font-bold">
              Note: <span className="font-normal">{game.note}</span>
            </p>
            <p className="font-bold">
              Mode multijoueur:
              <span className="font-normal">
                {game.multiplayerMode ? "Oui" : "Non"}
              </span>
            </p>
            <p className="font-bold">
              Date de sortie:
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
              Visitez le site officiel
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
