/* eslint-disable react/prop-types */
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
  return (
    <form onSubmit={handleUpdate} className="px-6 pt-6 pb-8">
      <InputMain
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        type="text"
        label="Prénom"
        placeholder="Prénom"
        id="prenom"
      />

      <InputMain
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        type="text"
        label="Nom"
        placeholder="Nom de famille"
        id="nom"
      />

      <InputMain
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
        label="Email"
        placeholder="Email"
        id="email"
      />

      <InputMain
        value={phone}
        onChange={e => setPhone(e.target.value)}
        type="text"
        label="Téléphone"
        placeholder="Téléphone"
        id="telephone"
      />

      <InputMain
        value={birthday}
        onChange={e => setBirthday(e.target.value)}
        type="date"
        label="Date de naissance"
        placeholder="Date de naissance"
        id="birthday"
      />

      <div className="flex items-center justify-center gap-2 mt-2">
          <BtnMain label="Sauvegarder les modifications" type="submit" />
        <BtnMain label="Annuler" type="submit" onClick={handleEditMode} />
      </div>
    </form>
  );
}
