import React from "react";
import { Review } from "../../types/interfaces";

const MovieReview: React.FC<Review> =  ({author, content}) => {
  return (
    <>
      <p>Review By: {author} </p>
      <p>{content} </p>
    </>
  );
};
export default MovieReview