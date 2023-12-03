import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";

// eslint-disable-next-line react/prop-types
export default function SelectEditeur({ onChange, value }) {
  const authHeader = useAuthHeader();
  const [editeurs, setEditeurs] = useState([]);

  useEffect(() => {
    api
      .get("/editeur/getEditeurs", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then(
        (res) => {
          setEditeurs(res.data);
        } // Ajouter cette ligne pour le débogage
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <label className="mt-2 block text-sm font-medium text-gray-700">
        Editeur :
      </label>
      <select
        onChange={onChange}
        value={value}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        <option value="">Sélectionnez un éditeur</option>
        {editeurs.map((editeur) => (
          <option key={editeur._id} value={editeur._id}>
            {editeur.nom}
          </option>
        ))}
      </select>
    </>
  );
}
