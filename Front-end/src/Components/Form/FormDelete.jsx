/* eslint-disable react/prop-types */
import React from "react";
import BtnMain from "../Btn/BtnMain";

export default function FormDelete({ no, yes }) {
  return (
    <>
      <h2>
        Voulez-vous vraiment retirer ce commentaire ? Répondez par
        &quot;Oui&quot; pour confirmer ou &quot;Non&quot; pour annuler.
      </h2>
      <div className="flex justify-center space-x-5">
        <BtnMain label="oui" type="button" onClick={yes} />
        <BtnMain label="non" type="button" onClick={() => no(false)} />
      </div>
    </>
  );
}
