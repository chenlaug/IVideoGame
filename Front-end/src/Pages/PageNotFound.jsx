import Iamlost from "../Image/john-travolta-lost.gif";
import BackButton from "../Components/Btn/BackButton";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-light-White dark:bg-dark-Black">
      <h1 className="text-6xl font-bold text-light-TBlack dark:text-dark-TWhite">
        404
      </h1>
      <h2 className="mt-2 text-xl text-light-TBlack dark:text-dark-TWhite">
        Désolé, nous n&apos;avons pas trouvé la page que vous cherchez.
      </h2>
      <img src={Iamlost} alt="Iamlost" className="w-64 h-64 my-8" />
      <BackButton label="Retour à la page d'accueil" />
    </div>
  );
}
