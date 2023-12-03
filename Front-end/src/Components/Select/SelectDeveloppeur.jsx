import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";

// eslint-disable-next-line react/prop-types
export default function SelectDeveloppeur({ onChange, value }) {
  const authHeader = useAuthHeader();
  const [developpeur, setDeveloppeur] = useState([]);

  useEffect(() => {
    api
      .get("/developpeur/getDeveloppeurs", {
        headers: {
          Authorization: authHeader(),
        },
      })
      .then((res) => setDeveloppeur(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <label className="mt-2 block text-sm font-medium text-gray-700">
        Developpeur :
      </label>

      <select
        onChange={onChange}
        value={value}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
      >
        <option value="">Sélectionnez un developpeur</option>
        {developpeur.map((developpeur) => (
          <option key={developpeur._id} value={developpeur._id}>
            {developpeur.nom}
          </option>
        ))}
      </select>
    </>
  );
}