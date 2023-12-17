import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddGame from '../../Components/Modal/AddGame';
import TableauJeux from '../../Components/Tableau/TableauJeux';
import Pagination from '../../Components/Pagination/Pagination';
import BtnMain from '../../Components/Btn/BtnMain';
import PropTypes from 'prop-types';

AdminGame.propTypes = {
  hovered: PropTypes.bool.isRequired,
};

/**
 * Le composant `AdminGame` est la page d'administration des jeux vidéo.
 * Il permet d'ajouter, de visualiser et de gérer les jeux vidéo.
 * Ce composant utilise plusieurs sous-composants :
 * - `BtnMain` : Un bouton pour ajouter un nouveau jeu.
 * - `TableauJeux` : Un tableau affichant les jeux existants avec des options pour les modifier ou les supprimer.
 * - `Pagination` : Un composant de pagination pour naviguer entre les pages de jeux.
 * - `AddGame` : Un modal pour ajouter ou modifier un jeu.
 *
 * Les états `isOpen`, `isOpenDelete`, `idGame`, `listeGame`, `currentGame`, `currentPage`, `setCurrentPage`
 * gèrent respectivement l'ouverture des modals, l'identification du jeu sélectionné,
 * la liste des jeux, le jeu actuellement sélectionné pour modification, et la pagination.
 *
 * @param {boolean} hovered - État indiquant si la barre latérale est étendue ou non.
 * @returns {JSX.Element} - La page d'administration des jeux vidéo.
 */

export default function AdminGame({ hovered }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idGame, setIdGame] = useState('');
  const [listeGame, setListeGame] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [version, setVersion] = useState(0);
  const { t } = useTranslation();
  const gamesPerPage = 6;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = listeGame.slice(indexOfFirstGame, indexOfLastGame);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        hovered ? 'ml-64' : 'ml-16'
      }`}
    >
      <BtnMain
        label={t('Button.addGame')}
        type="button"
        onClick={() => setIsOpen(true)}
      />
      <TableauJeux
        listeGame={currentGames}
        setListeGame={setListeGame}
        isOpenDelete={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        idGame={idGame}
        setIdGame={setIdGame}
        setCurrentGame={setCurrentGame}
        version={version}
      />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalGames={listeGame.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <AddGame
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        listeGame={listeGame}
        setListeGame={setListeGame}
        currentGame={currentGame}
        setVersion={setVersion}
      />
    </div>
  );
}
