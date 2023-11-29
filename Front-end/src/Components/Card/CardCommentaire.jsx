/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from "react";

export default function CardCommentaire({ comments }) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-light-LightGray text-center dark:bg-dark-BlackGray shadow-inner rounded-xl mt-5">
      {comments.map(comment => (
        <div key={comment._id} className=" shadow-lg rounded-md p-4">
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
