/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import InputMain from "../Input/InputMain";
import BtnMain from "../Btn/BtnMain";

export default function FormProfile({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  birthday,
  setBirthday,
  handleEditMode,
  handleUpdate,
}) {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleUpdate} className="px-6 pt-6 pb-8">
      <InputMain
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        type="text"
        label={t("input.label.firstName")}
        placeholder={t("input.placeholder.firstName")}
        id="prenom"
      />

      <InputMain
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        type="text"
        label={t("input.label.nom")}
        placeholder={t("input.placeholder.nom")}
        id="nom"
      />

      <InputMain
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
        label={t("input.label.email")}
        placeholder={t("input.placeholder.email")}
        id="email"
      />

      <InputMain
        value={phone}
        onChange={e => setPhone(e.target.value)}
        type="text"
        label={t("input.label.phone")}
        placeholder={t("input.placeholder.phone")}
        id="telephone"
      />

      <InputMain
        value={birthday}
        onChange={e => setBirthday(e.target.value)}
        type="date"
        label={t("input.label.birthday")}
        placeholder={t("input.placeholder.birthday")}
        id="birthday"
      />

      <div className="flex items-center justify-center gap-2 mt-2">
          <BtnMain label={t("Button.save")} type="submit" />
        <BtnMain label={t("Button.Cancel")} type="submit" onClick={handleEditMode} />
      </div>
    </form>
  );
}
