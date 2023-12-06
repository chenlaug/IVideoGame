import { useState, useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import calculateAge from "../../Utils/CalculateAge";
import api from "../../Utils/api";
import BtnDeleteAccountModal from "../Btn/BtnDeleteAccountModal ";
import BtnMain from "../Btn/BtnMain";
import FormProfile from "../Form/FormProfile";

export default function ProfileDisplay() {
  const [user, setUser] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const { t } = useTranslation();

  const authHeader = useAuthHeader();
  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get("/user/getUserFromToken", {
        headers: {
          Authorization: authHeader(),
        },
      });

      setUser(response.data);
    } catch (error) {
      toast.error(t("toast.error"));
    }
  }, [authHeader, setUser]);

  useEffect(() => {
    if (user && !editMode) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setBirthday(
        user.birthday ? new Date(user.birthday).toISOString().split("T")[0] : ""
      );
    }
  }, [user, editMode]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(t("toast.loading"));

    try {
      const response = await api.put(
        `user/updateUser/${user._id}`,
        {
          firstName,
          lastName,
          email,
          phone,
          birthday: new Date(birthday),
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      const result = response.data;
      if (result) {
        toast.dismiss(loadingToast);
        toast.success(t("toast.success"));
        setUser(result);
        fetchData();
        setUpdateKey(updateKey + 1);
      } else {
        throw new Error(
          "Une erreur est survenue lors de la mise à jour des informations."
        );
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(t("toast.error"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [authHeader, fetchData]);

  if (!user) {
    return <div>{t("toast.loading")}</div>;
  }

  return (
    <div
      className="w-full max-w-md mx-auto overflow-hidden bg-light-LightGray dark:bg-dark-BlackGray shadow-inner rounded-xl "
      key={updateKey}
    >
      <div className="px-5 py-3">
        <h2 className="font-text text-light-TBlack dark:text-dark-TWhite uppercase text-xl font-bold mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.email")}</strong> {user.email}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.phone")}</strong> {user.phone}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.birthday")}</strong>
          {new Date(user.birthday).toLocaleDateString()}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.old")}</strong>
          {calculateAge(user.birthday)}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.NumberFavoriteGames")}</strong>
          {user.favorisGames.length}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.NumberComments")}</strong>
          {user.comments.length}
        </p>
        <p className="font-text text-light-TBlack dark:text-dark-TWhite">
          <strong>{t("input.label.AccountConfirmed")}</strong>
          {user.confirmed ? t("text.yes") : t("text.no")}
        </p>
      </div>
      {!editMode ? (
        <div className="flex items-center justify-center mb-2">
          <div className="mr-2">
            <BtnMain
              label={t("Button.ModifyInformation")}
              type="button"
              onClick={handleEditMode}
            />
          </div>
          <BtnDeleteAccountModal />
        </div>
      ) : (
        <FormProfile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          birthday={birthday}
          setBirthday={setBirthday}
          handleEditMode={handleEditMode}
          handleUpdate={handleUpdate}
        />
      )}
      <Toaster />
    </div>
  );
}
