import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SideBar from '../../Components/NavBar/SideBar';
import BtnMain from '../../Components/Btn/BtnMain';
import TableauEditeur from '../../Components/Tableau/TableauEditeur';
import AddEditeur from '../../Components/Modal/AddEditeur';

/**
 * Le composant `AdminEditeur` est la page d'administration des éditeurs.
 * Il permet d'ajouter, de visualiser et de gérer les éditeurs.
 * Ce composant utilise plusieurs sous-composants :
 * - `SideBar` : Un panneau latéral de navigation.
 * - `BtnMain` : Un bouton pour ajouter un nouvel éditeur.
 * - `TableauEditeur` : Un tableau affichant les éditeurs existants.
 * - `AddEditeur` : Un modal pour ajouter ou modifier un éditeur.
 *
 * Les états `hovered`, `isOpenAddEditeur`, et `CurrentEditeur`
 * gèrent respectivement l'affichage de la barre latérale, l'ouverture du modal,
 * et l'éditeur actuellement sélectionné pour modification.
 *
 * @returns {JSX.Element} - La page d'administration des éditeurs.
 */

export default function AdminEditeur() {
  const [hovered, setHovered] = useState(false);
  const [isOpenAddEditeur, setIsOpenAddEditeur] = useState(false);
  const [CurrentEditeur, setCurrentEditeur] = useState(null);
  const { t } = useTranslation();

  return (
    <div>
      <SideBar hovered={hovered} setHovered={setHovered} />
      <div
        className={`transition-all duration-200 ease-in-out ${
          hovered ? 'ml-64' : 'ml-16'
        }`}
      >
        <BtnMain
          label={t('Button.addEditor')}
          type="button"
          onClick={() => setIsOpenAddEditeur(true)}
        />
        <TableauEditeur
          setIsOpenAddEditeur={setIsOpenAddEditeur}
          setCurrentEditeur={setCurrentEditeur}
        />
        <AddEditeur
          isOpenAddEditeur={isOpenAddEditeur}
          setIsOpenAddEditeur={setIsOpenAddEditeur}
          CurrentEditeur={CurrentEditeur}
        />
      </div>
    </div>
  );
}
