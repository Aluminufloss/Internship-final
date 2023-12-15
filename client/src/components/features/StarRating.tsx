import React from "react";
import styled from "styled-components";
import Star from "../shared/Star";
import { countRating } from "@/utils/helper/helper";

type StarRatingProps = {
  className?: string;
  rating: string;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  const starFlag = countRating(props.rating);

  return (
    <StyledStarRating className={props.className} rating={props.rating}>
      <div className="stars__container">
        <Star flag={starFlag[0]}/>
        <Star flag={starFlag[1]}/>
        <Star flag={starFlag[2]}/>
        <Star flag={starFlag[3]}/>
        <Star flag={starFlag[4]}/>
      </div>
      <span className="rating">{props.rating}</span>
    </StyledStarRating>
  )
};

const StyledStarRating = styled.div<StarRatingProps>`
  width: 100%;
  display: flex;
  justify-content: center;
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
