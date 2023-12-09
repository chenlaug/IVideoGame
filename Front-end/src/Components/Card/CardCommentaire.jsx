import PropTypes from 'prop-types';

CardCommentaire.propTypes = {
  comments: PropTypes.array.isRequired,
};

/**
 * Composant `CardCommentaire` qui affiche une liste de commentaires.
 * Chaque commentaire est présenté dans sa propre carte avec son contenu et sa note.
 *
 * @param {Object} props - Les props passées au composant.
 * @param {Array} props.comments - Un tableau d'objets commentaire, où chaque commentaire contient un `_id`, un `contenu` et une `note`.
 * @returns {JSX.Element} Un ensemble de cartes, chaque carte affichant les détails d'un commentaire.
 */

export default function CardCommentaire({ comments }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-light-LightGray text-center dark:bg-dark-BlackGray  rounded-xl mt-5">
      {comments.map((comment) => (
        <div key={comment._id} className="shadow-md rounded-md p-4">
          <p className="mt-2 text-sm text-light-TBlack dark:text-dark-TWhite">
            {comment.contenu}
          </p>
          <p className="mt-2 font-medium text-light-TBlack dark:text-dark-TWhite">
            Note : {comment.note}
          </p>
        </div>
      ))}
    </div>
  );
}
