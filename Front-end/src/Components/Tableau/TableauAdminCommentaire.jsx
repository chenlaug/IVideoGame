/* eslint-disable no-underscore-dangle */
import  { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuthHeader } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../../Utils/api";
import DeleteCommentaire from "../Modal/DeleteCommentaire";
import Searchbar from "../SeachBar/Searchbar";
import Pagination from "../Pagination/Pagination";

export default function TableauAdminCommentaire() {
  const [isOpenDeleteCommentaire, setIsOpenDeleteCommentaire] = useState(false);
  const [listeCommentaire, setListeCommentaire] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idCommentaire, setIdCommentaire] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentairePerPage = 6;
  const indexOfLastGame = currentPage * commentairePerPage;
  const indexOfFirstGame = indexOfLastGame - commentairePerPage;
  const currentCommentaires = listeCommentaire.slice(
    indexOfFirstGame,
    indexOfLastGame
  );
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentaire = async () => {
      try {
        const response = await api.get(
          `/comments/getComments?title=${searchQuery}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        setListeCommentaire(response.data);
      } catch (error) {
        toast.error("une erreur est survenue");
      }
    };
    fetchCommentaire();
  }, [authHeader, listeCommentaire, searchQuery]);

  const openModalDeleteCommentaire = id => {
    setIsOpenDeleteCommentaire(true);
    setIdCommentaire(id);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const table = currentCommentaires.map(commentaire => (
    <tr key={commentaire._id}>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {commentaire.VideoGame.titre}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {commentaire.author}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {commentaire.note}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {commentaire.contenu}
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
                      onClick={() =>
                        openModalDeleteCommentaire(commentaire._id)
                      }
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
                      onClick={() =>
                        navigate(`/game/${commentaire.VideoGame._id}`)
                      }
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
      <div className="flex flex-col items-center min-h-screen overflow-x-auto p-10">
        <Searchbar query={searchQuery} handleSearch={handleSearch} />
        <table className="w-full table-auto border-collapse text-sm text-center">
          <thead>
            <tr className="bg-light-LightGray dark:bg-dark-BlackGray text-light-TBlack dark:text-dark-TWhite">
              <th className="p-2 ">Titre du Jeu</th>
              <th className="p-2 ">Auteur du commentaire</th>
              <th className="p-2 ">Note</th>
              <th className="p-2 ">Contenu du commentaire</th>
              <th className="p-2 ">Option</th>
            </tr>
          </thead>
          <tbody className=" bg-light-LightGray dark:bg-dark-BlackGray divide-y divide-gray-300">
            {table}
          </tbody>
        </table>
        <Pagination
          gamesPerPage={commentairePerPage}
          totalGames={currentCommentaires.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Toaster />
      <DeleteCommentaire
        isOpenDeleteCommentaire={isOpenDeleteCommentaire}
        setIsOpenDeleteCommentaire={setIsOpenDeleteCommentaire}
        idCommentaire={idCommentaire}
      />
    </>
  );
}
