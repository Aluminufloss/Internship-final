import React from "react";
import styled from "styled-components";
import Star from "../shared/Star";

type StarRatingProps = {
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  return (
    <StyledStarRating className={props.className}>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
      <span className="rating">5.0</span>
    </StyledStarRating>
  )
};

const StyledStarRating = styled.div<StarRatingProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rating {
    color: ${(props) => `${props.theme.colors.darkGrey}`};
    font-size: 13px;
  }
`;

export default StarRating;
