import { useEffect, Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuthHeader } from 'react-auth-kit';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../Utils/api';
import Searchbar from '../SeachBar/Searchbar';
import Pagination from '../Pagination/Pagination';
import DeleteEditeur from '../Modal/DeleteEditeur';
import PropTypes from 'prop-types';

TableauEditeur.propTypes = {
  setIsOpenAddEditeur: PropTypes.func.isRequired,
  setCurrentEditeur: PropTypes.func.isRequired,
};

/**
 * Composant `TableauEditeur` pour afficher, rechercher, modifier et supprimer des éditeurs.
 * Utilise plusieurs hooks d'état pour gérer l'affichage et les interactions avec l'API.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.setIsOpenAddEditeur - Fonction pour définir l'état d'ouverture de la modal d'ajout/modification d'éditeur.
 * @param {Function} props.setCurrentEditeur - Fonction pour définir l'éditeur actuel à modifier.
 * @returns {JSX.Element} - Composant qui affiche le tableau des éditeurs avec fonctionnalités de recherche, de modification, de suppression, et de pagination.
 */

export default function TableauEditeur({
  setIsOpenAddEditeur,
  setCurrentEditeur,
}) {
  const [listeEditeur, setListeEditeur] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpenDeleteEditeur, setIsOpenDeleteEditeur] = useState(false);
  const [idEditeur, setIdEditeur] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const editeurPerPage = 6;
  const indexOfLastEditeur = currentPage * editeurPerPage;
  const indexOfFirstEditeur = indexOfLastEditeur - editeurPerPage;
  const currentEditeur = listeEditeur.slice(
    indexOfFirstEditeur,
    indexOfLastEditeur
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const authHeader = useAuthHeader();
  useEffect(() => {
    const fetchCommentaire = async () => {
      try {
        const response = await api.get(
          `/editeur/getEditeurs?nom=${searchQuery}`,
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
        setListeEditeur(response.data);
      } catch (error) {
        toast.error(t('toast.error'));
      }
    };
    fetchCommentaire();
  }, [authHeader, listeEditeur, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const openModalUpdate = (user) => {
    setIsOpenAddEditeur(true);
    setCurrentEditeur(user);
  };

  const openModalDelete = (id) => {
    setIsOpenDeleteEditeur(true);
    setIdEditeur(id);
  };

  const table = currentEditeur.map((editeur) => (
    <tr key={editeur._id}>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {editeur.nom}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        {editeur.pays}
      </td>
      <td className="p-2 text-light-TBlack dark:text-dark-TWhite">
        <a
          href={editeur.siteWeb}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-light-Yellow text-light-TBleu hover:bg-light-VCYellow text-center font-medium py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          {t('game.VisitWebsite')}
        </a>
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
                        active ? 'bg-light-Yellow text-light-TBleu' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => openModalUpdate(editeur)}
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
                      {t('Button.modify')}
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
                        active ? 'bg-light-Yellow text-light-TBleu' : ''
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => openModalDelete(editeur._id)}
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
                      {t('Button.delete')}
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
              <th className="p-2">{t('table.Name')}</th>
              <th className="p-2">{t('table.Country')}</th>
              <th className="p-2">{t('table.Website')}</th>
              <th className="p-2">{t('table.Option')}</th>
            </tr>
          </thead>
          <tbody className="bg-light-LightGray dark:bg-dark-BlackGray divide-y divide-gray-300">
            {table}
          </tbody>
        </table>
        <Pagination
          gamesPerPage={editeurPerPage}
          totalGames={currentEditeur.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Toaster />
      <DeleteEditeur
        isOpenDeleteEditeur={isOpenDeleteEditeur}
        setIsOpenDeleteEditeur={setIsOpenDeleteEditeur}
        idEditeur={idEditeur}
      />
    </>
  );
}
