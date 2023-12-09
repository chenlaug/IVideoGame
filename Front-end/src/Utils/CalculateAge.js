/**
 * Calcule l'âge d'une personne à partir de sa date de naissance.
 *
 * Cette fonction prend une chaîne représentant la date de naissance d'une personne et 
 * calcule son âge en années. Elle utilise les objets JavaScript `Date` pour manipuler 
 * et comparer les dates. La fonction tient compte des différences de fuseaux horaires 
 * en convertissant les dates en temps universel coordonné (UTC).
 *
 * @param {string} birthday - La date de naissance sous forme de chaîne de caractères. 
 *                            Le format attendu est 'YYYY-MM-DD'.
 * @returns {number} L'âge calculé à partir de la date de naissance fournie.
 *
 * @example
 * // Calcule l'âge d'une personne née le 1er janvier 2000
 * calculateAge('2000-01-01'); // Retourne l'âge en années
 */
export default function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const differenceInMs = Date.now() - birthDate.getTime();
  const ageDt = new Date(differenceInMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
}
