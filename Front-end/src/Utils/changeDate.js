/* eslint-disable import/prefer-default-export */
export function formatDate(dateStr) {
  // Création d'un objet Date à partir de la chaîne de caractères ISO 8601
  const date = new Date(dateStr);

  // Extraction du jour, du mois et de l'année
  const jour = String(date.getDate()).padStart(2, "0");
  const mois = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0 en JS
  const annee = date.getFullYear();

  // Construction de la date au format jj/mm/yyyy
  const dateFormatted = `${jour}/${mois}/${annee}`;

  return dateFormatted;
}
