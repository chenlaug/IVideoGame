/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import SelectMain from "../Select/SelectMain";
import { optionRole } from "../../Utils/tableauOptionSelect";

export default function FormAddUtilisateur({
  setIsOpenDeleteCommentaire,
  CurrentUser,
}) {
  const [lastName, setLastName] = useState(
    CurrentUser ? CurrentUser.lastName : ""
  );
  const [firstName, setFirstName] = useState(
    CurrentUser ? CurrentUser.firstName : ""
  );
  const [phone, setPhone] = useState(CurrentUser ? CurrentUser.phone : "");
  const [role, setRole] = useState(CurrentUser ? CurrentUser.role : "");

  const [birthday, setBirthday] = useState(
    CurrentUser ? CurrentUser.birthday : ""
  );
  const [email, setEmail] = useState(CurrentUser ? CurrentUser.email : "");

  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Chargement en cours...");
    const data = {
      lastName,
      firstName,
      phone,
      role,
      birthday,
      email,
    };
    try {
      if (CurrentUser) {
        // If CurrentUser is defined, update the user
        await api.put(`/user/updateUser/${CurrentUser._id}`, data, {
          headers: {
            Authorization: authHeader(),
          },
        });
      } else {
        // si CurrentUser est undefined, créer un nouveau user
        await api.post("/user/createUserAdmin", data, {
          headers: {
            Authorization: authHeader(),
          },
        });
        setLastName("");
        setFirstName("");
        setPhone("");
        setRole("");
        setBirthday("");
        setEmail("");
      }

      toast.dismiss(loadingToast);
      toast.success("L'opération a réussi!");
      setIsOpenDeleteCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("L'opération a échoué.");
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        label="Nom de famille"
        placeholder="Nom de famille"
        id="lastName"
      />

      <InputMain
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        label="Prénom"
        placeholder="Prénom"
        id="firstName"
      />

      <InputMain
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="number"
        label="Téléphone"
        placeholder="Téléphone"
        id="phone"
      />

      <SelectMain
        label="rôle"
        id="plateformes"
        onChange={(e) => setRole(e.target.value)}
        value={role}
        options={optionRole}
        placeholder="---Sélectionnez un role.---"
      />

      <div>
        <InputMain
          value={
            CurrentUser && CurrentUser.birthday
              ? new Date(CurrentUser.birthday).toISOString().split("T")[0]
              : birthday
          }
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          label="Date de naissance"
          placeholder="Date de naissance"
          id="birthday"
        />
      </div>

      <div>
        <InputMain
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email"
          placeholder="Email"
          id="email"
        />
      </div>

      <BtnMain
        label={
          CurrentUser ? "Modifier un utilisateur" : "Creation d'un utilisateur"
        }
        type="submit"
      />
      <Toaster />
    </form>
  );
}
