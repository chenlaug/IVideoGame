export default function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const differenceInMs = Date.now() - birthDate.getTime();
  const ageDt = new Date(differenceInMs);

  return Math.abs(ageDt.getUTCFullYear() - 1970);
}
