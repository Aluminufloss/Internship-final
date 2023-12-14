import React from "react";
import styled from "styled-components";
import Star from "../shared/Star";

type StarRatingProps = {
  className?: string;
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  const rating = Number.isInteger(props.rating)
    ? `${props.rating}.00`
    : `${props.rating}`;

  return (
    <StyledStarRating className={props.className} rating={props.rating}>
      <div className="stars__container">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <span className="rating">{rating}</span>
    </StyledStarRating>
  )
};

const StyledStarRating = styled.div<StarRatingProps>`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .rating {
    color: ${(props) => `${props.theme.colors.darkGrey}`};
    font-size: 13px;
  }

  .stars__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 12px;
    flex-grow: 2;
  }
`;

export default StarRating;
