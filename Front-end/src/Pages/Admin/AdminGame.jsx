import { useState } from "react";
import AddGame from "../../Components/Modal/AddGame";
import TableauJeux from "../../Components/Tableau/TableauJeux";
import Pagination from "../../Components/Pagination/Pagination";
import BtnMain from "../../Components/Btn/BtnMain";

// eslint-disable-next-line react/prop-types
export default function AdminGame({ hovered }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idGame, setIdGame] = useState("");
  const [listeGame, setListeGame] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = listeGame.slice(indexOfFirstGame, indexOfLastGame);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`transition-all duration-200 ease-in-out ${
        hovered ? "ml-64" : "ml-16"
      }`}
    >
      <BtnMain
        label="+ Ajouter un jeu"
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
      />
    </div>
  );
}
