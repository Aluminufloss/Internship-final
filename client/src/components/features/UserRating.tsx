import React, { useState } from "react";
import styled from "styled-components";
import Star from "../shared/Star";
import Text from "../shared/Text";

type UserRatingProps = {
  className?: string;
};

const UserRating: React.FC<UserRatingProps> = (props) => {
  const [totalRating, setTotalRating] = useState(0);

  function handleClick(num: number) {
    console.log(num);
    setTotalRating(num);
  }

  return (
    <StyledStarRating className={props.className}>
      <>
        <div className="stars__container">
          <Star
            flag={totalRating >= 1 ? "full" : "empty"}
            number={1}
            onClick={handleClick}
          />
          <Star
            flag={totalRating >= 2 ? "full" : "empty"}
            number={2}
            onClick={handleClick}
          />
          <Star
            flag={totalRating >= 3 ? "full" : "empty"}
            number={3}
            onClick={handleClick}
          />
          <Star
            flag={totalRating >= 4 ? "full" : "empty"}
            number={4}
            onClick={handleClick}
          />
          <Star
            flag={totalRating >= 5 ? "full" : "empty"}
            number={5}
            onClick={handleClick}
          />
        </div>
        <Text
            className="text"
            color="darkGrey"
            fontWeight="medium"
            fontSize="small"
          >
            Rate this book
          </Text>
      </>
    </StyledStarRating>
  );
};

const StyledStarRating = styled.div<UserRatingProps>`
  width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .stars__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 12px;
    margin-bottom: 9px;
  }

  .text {
  }
`;

export default UserRating;
