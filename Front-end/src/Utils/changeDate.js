/**
 * Formate une date fournie sous forme de chaîne de caractères en format 'jj/mm/yyyy'.
 *
 * La fonction prend en entrée une chaîne représentant une date au format ISO 8601 
 * et la convertit en un format plus lisible, spécifiquement 'jj/mm/yyyy'. Elle utilise 
 * l'objet JavaScript `Date` pour analyser et manipuler la date fournie. 
 * La fonction gère correctement les zéros initiaux pour les jours et les mois.
 *
 * @param {string} dateStr - La date au format ISO 8601 ('YYYY-MM-DD').
 * @returns {string} La date formatée au format 'jj/mm/yyyy'.
 *
 * @example
 * // Formate la date '2023-04-01' en '01/04/2023'
 * formatDate('2023-04-01'); // Retourne '01/04/2023'
 */

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
