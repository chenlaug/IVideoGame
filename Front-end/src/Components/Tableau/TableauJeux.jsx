/* eslint-disable react/prop-types */
import { useEffect, Fragment, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";

import api from "../../Utils/api";
import DeleteGame from "../Modal/DeleteGame";
import Searchbar from "../SeachBar/Searchbar";

export default function TableauJeux({
  listeGame,
  setListeGame,
  isOpenDelete,
  setIsOpenDelete,
  idGame,
  setIdGame,
  setIsOpen,
  setCurrentGame,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const openModalDelete = (id) => {
    setIsOpenDelete(true);
    setIdGame(id);
  };

  const openModalUpdate = (game) => {
    setIsOpen(true);
    setCurrentGame(game);
  };

  useEffect(() => {
    const fetchGames = async (query = "") => {
      try {
        const response = await api.get(
          `/videoGame/getAllGames?search=${query}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        setListeGame(response.data);
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    };
    fetchGames(searchQuery);
  }, [setListeGame, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const table = listeGame.map((game) => (
    <tr key={game.id}>
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
        {game.typeDeJeu}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {game.note}
      </td>
      <td className="p-2">
        <img
          src={`http://localhost:5000/${game.image}`}
          alt={game.titre}
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td className="p-2">
        <img
          src={`http://localhost:5000/imagePegi/${
            game.pegiImage ? game.pegiImage : "default.png"
          }`}
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
                      onClick={() => openModalUpdate(game)}
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      Modifier
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
                      onClick={() => openModalDelete(game._id)}
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
    <div className="p-10">
      <div className="flex flex-col items-center overflow-x-auto">
        <Searchbar query={searchQuery} handleSearch={handleSearch} />
      </div>
      <table className="w-full table-auto border-collapse text-sm text-center">
        <thead>
          <tr className="bg-light-LightGray dark:bg-dark-BlackGray text-light-TBlack dark:text-dark-TWhite">
            <th className="p-2">Titre</th>
            <th className="p-2">plateformes</th>
            <th className="p-2">description</th>
            <th className="p-2">typeDeJeu</th>
            <th className="p-2">note</th>
            <th className="p-2">image</th>
            <th className="p-2">pegi</th>
            <th className="p-2">Option</th>
          </tr>
        </thead>
        <tbody className=" bg-light-LightGray dark:bg-dark-BlackGray divide-y divide-gray-300">
          {table}
        </tbody>
      </table>
      <Toaster />
      <DeleteGame
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        idGame={idGame}
        listeGame={listeGame}
        setListeGame={setListeGame}
      />
    </div>
  );
}
