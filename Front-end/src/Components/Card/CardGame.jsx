/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import toast, { Toaster } from "react-hot-toast";
import api from "../../Utils/api";
import AddCommentaire from "../Modal/AddCommentaire";
import BtnMain from "../Btn/BtnMain";
import BtnNavLink from "../Btn/BtnNavLink";

export default function CardGame({ game }) {
  const [isOpenCommentaire, setIsOpenCommentaire] = useState(false);
  const [gameId, setGameId] = useState("");
  const authHeader = useAuthHeader();
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
      toast.success("le jeu a bien ete ajouter a votre liste de jeux favoris");
    } catch (error) {
      toast.error(
        "Une erreur est survenue pendant l'ajout du jeu à votre liste de jeux favoris ou le jeu est déjà dans votre liste de favoris"
      );
    }
  };
  const openModalAddCommentaire = (id) => {
    setIsOpenCommentaire(true);
    setGameId(id);
  };

  return (
    <>
      <div className="bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl max-w-sm overflow-hidden border-dark-BlackGray dark:border-light-LightGray border m-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-2">
        <div className="w-full h-64 flex items-center justify-center">
          <img
            className="max-h-full max-w-full"
            src={`http://localhost:5000/${game.image}`}
            alt={game.titre}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl font-titre text-light-TBlack dark:text-dark-TWhite mb-2">
            {game.titre}
          </div>
          <p className="font-text text-light-TBlack dark:text-dark-TWhite text-base">
            {game.description}
          </p>
        </div>
        <div className="flex justify-center items-center px-6 pt-4 pb-2">
          <span className="inline-block font-text bg-light-Yellow text-light-TBleu rounded-full px-3 py-1 text-xs font-semibold  mr-2 mb-2">
            #{game.typeDeJeu}
          </span>
          <span className="inline-block font-text text-center bg-light-Yellow text-light-TBleu rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">
            #{game.plateformes.join(", ")}
          </span>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-1">
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
          <BtnNavLink
            link={`/game/${game._id}`}
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
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            }
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
      <Toaster />
      <AddCommentaire
        isOpenCommentaire={isOpenCommentaire}
        setIsOpenCommentaire={setIsOpenCommentaire}
        gameId={gameId}
      />
    </>
  );
}
