
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import api from "../../Utils/api";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";
import SelectMain from "../Select/SelectMain";
import { optionRole } from "../../Utils/tableauOptionSelect";
import PropTypes from "prop-types";

FormAddUtilisateur.propTypes = {
  setIsOpenDeleteCommentaire: PropTypes.func.isRequired,
  CurrentUser: PropTypes.object,
};

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

  const { t } = useTranslation();
  const authHeader = useAuthHeader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.error"));
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
        // Réinitialiser les champs du formulaire après la création réussie de l'utilisateur

        setLastName("");
        setFirstName("");
        setPhone("");
        setRole("");
        setBirthday("");
        setEmail("");
      }

      toast.dismiss(loadingToast);
      toast.success(t("toast.success"));
      setIsOpenDeleteCommentaire(false);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <InputMain
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        label={t("input.label.nom")}
        placeholder={t("input.placeholder.nom")}
        id="lastName"
      />

      <InputMain
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        label={t("input.label.firstName")}
        placeholder={t("input.placeholder.firstName")}
        id="firstName"
      />

      <InputMain
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="number"
        label={t("input.label.phone")}
        placeholder={t("input.placeholder.phone")}
        id="phone"
      />

      <SelectMain
        label={t("input.label.role")}
        placeholder={t("input.placeholder.role")}
        id="plateformes"
        onChange={(e) => setRole(e.target.value)}
        value={role}
        options={optionRole}
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
          label={t("input.label.birthday")}
          placeholder={t("input.placeholder.birthday")}
          id="birthday"
        />
      </div>

      <div>
        <InputMain
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label={t("input.label.email")}
          placeholder={t("input.placeholder.email")}
          id="email"
        />
      </div>

      <BtnMain
        label={CurrentUser ? t("Modal.editingUser") : t("Modal.addUser")}
        type="submit"
      />
      <Toaster />
    </form>
  );
}
