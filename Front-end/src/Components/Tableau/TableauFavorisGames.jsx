/* eslint-disable no-underscore-dangle */
import { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import DeleteFavorisGames from "../Modal/DeleteFavorisGames";
import api from "../../Utils/api";
import Searchbar from "../SeachBar/Searchbar";
import Pagination from "../Pagination/Pagination";

export default function TableauFavorisGames() {
  const [listeFavorisGames, setListeFavorisGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idGameFavori, setIsGameFavori] = useState("");
  const [isOpenDeleteFavoris, setIsOpenDeleteFavoris] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = listeFavorisGames.slice(
    indexOfFirstGame,
    indexOfLastGame
  );
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchGames = async (query = "") => {
      try {
        const response = await api.get(
          `/user/getUserFavorites?titre=${query}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        if (Array.isArray(response.data.favorisGames)) {
          setListeFavorisGames(response.data.favorisGames);
        } else {
          toast.error(
            "Une erreur est survenue lors de la récupération des jeux favoris"
          );
        }
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    };
    fetchGames(searchQuery);
  }, [setListeFavorisGames, searchQuery, authHeader]);

  const handleSearch = e => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const openModalDeleteFavori = id => {
    setIsOpenDeleteFavoris(true);
    setIsGameFavori(id);
  };

  const table = currentGames.map(game => (
    <tr key={game._id}>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.titre}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.plateformes}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.description}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.editeur}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.typeDeJeu}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.note}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        <img
          src={`http://localhost:5000/${game.image}`}
          alt={game.titre}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td className="p-2">
        <img
          src={`http://localhost:5000${game.pegiImage ? game.pegiImage : ""}`}
          alt={game.titre}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td className="p-2">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center text-lg rounded-md bg-light-Yellow text-light-TBleu hover:bg-light-VCYellow px-2 py-1">
              ...
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-40 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-light-Yellow text-light-TBleu" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      // eslint-disable-next-line no-underscore-dangle
                      onClick={() => openModalDeleteFavori(game._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Supprimer
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? "bg-light-Yellow text-light-TBleu" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      // eslint-disable-next-line no-underscore-dangle
                      onClick={() => navigate(`/game/${game._id}`)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Accède a la page
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="flex flex-col items-center min-h-screen overflow-x-auto">
        <Searchbar query={searchQuery} handleSearch={handleSearch} />
        <div className="min-w-screen mt-5 p-10">
          <table className="w-full min-w-full table-auto border-collapse text-sm text-center">
            <thead>
              <tr className="bg-light-LightGray dark:bg-dark-BlackGray text-light-TBlack dark:text-dark-TWhite">
                <th className="p-2 ">Titre</th>
                <th className="p-2 ">Plateformes</th>
                <th className="p-2 ">Description</th>
                <th className="p-2 ">Editeur</th>
                <th className="p-2 ">Type de jeu</th>
                <th className="p-2 ">Note</th>
                <th className="p-2 ">Image</th>
                <th className="p-2 ">Pegi</th>
                <th className="p-2 ">Option</th>
              </tr>
            </thead>
            <tbody className=" bg-light-LightGray dark:bg-dark-BlackGray divide-y ">
              {table}
            </tbody>
          </table>
        </div>
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={listeFavorisGames.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Toaster />
      <DeleteFavorisGames
        isOpenDeleteFavoris={isOpenDeleteFavoris}
        setIsOpenDeleteFavoris={setIsOpenDeleteFavoris}
        listeFavorisGames={listeFavorisGames}
        setListeFavorisGames={setListeFavorisGames}
        idGameFavori={idGameFavori}
      />
    </>
  );
}
