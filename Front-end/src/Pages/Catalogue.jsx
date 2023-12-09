import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import api from "../Utils/api";
import CardGame from "../Components/Card/CardGame";
import Pagination from "../Components/Pagination/Pagination";
import Searchbar from "../Components/SeachBar/Searchbar";

/**
 * Le composant `Catalogue` est utilisé pour afficher une liste paginée de jeux vidéo.
 * Il permet aux utilisateurs de rechercher des jeux et de naviguer entre différentes pages de résultats.
 *
 * Le composant utilise plusieurs sous-composants :
 * - `Searchbar` : Permet à l'utilisateur de rechercher des jeux.
 * - `CardGame` : Affiche les détails d'un jeu individuel.
 * - `Pagination` : Gère la navigation entre les pages de jeux.
 * - `Toaster` : Affiche les messages d'erreur ou de succès.
 *
 * Les états gérés dans ce composant incluent :
 * - `games` : La liste des jeux à afficher.
 * - `currentPage` : La page actuelle dans la pagination.
 * - `query` : La requête de recherche actuelle.
 *
 * L'effet `useEffect` est utilisé pour récupérer les données des jeux à partir de l'API en fonction de la requête de recherche.
 *
 * @returns {JSX.Element} - Le composant qui affiche le catalogue des jeux vidéo.
 */

export default function Catalogue() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const gamesPerPage = 6;
  const authHeader = useAuthHeader();
  useEffect(() => {
    api
      .get(
        "/videoGame/getAllGames",
        {
          headers: {
            Authorization: authHeader(),
          },
        },
        {
          params: {
            search: query,
          },
        }
      )
      .then((response) => {
        setGames(response.data);
      })
      .catch(() => {
        toast.error(t("toast.error"));
      });
  }, [query]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex items-center justify-center">
        <Searchbar query={query} handleSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0 mx-auto w-full md:w-3/4 lg:w-1/2 justify-items-center">
        {currentGames.map((game) => (
          <CardGame key={game._id} game={game} className="w-full md:max-w-sm" />
        ))}
      </div>
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={games.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Toaster />
    </div>
  );
}
