import React from "react";
import styled from "styled-components";
import Text from "../shared/Text";
import Button from "../shared/Button";
import StarRating from "../features/StarRating";

const Book: React.FC = (props) => {
  return (
    <StyledBook>
      <div className="book__image">
        <button className="book__like-btn"></button>
      </div>
      <Text className="book__title" fontSize="smallBig" fontWeight="medium" color="darkBlue">The Chronicles of Narnia</Text>
      <Text className="book__author" fontSize="small" fontWeight="semiBold" color="darkGrey">C. S. Lewis</Text>
      <StarRating className="book__rating"/>
      <Button
        className="book__buy-btn"
        type="primary"
        width="100"
        height="34"
        fontSize="smallBig"
      >
        $ 50.00 USD
      </Button>
    </StyledBook>
  );
};

const StyledBook = styled.li`
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;

  .book {
    &__image {
      width: 100%;
      height: 58%;
      background-image: url("images/books/6574ebeec35eb32f80655183.png");
      background-repeat: no-repeat;
      background-size: fill;
      background-position: center center;
      margin-bottom: 15px;
    }

    &__buy-btn {
      width: 100%;
    }

    &__author {

      margin-bottom: 12px;
    }

    &__rating {
      margin-bottom: 16px;
    }
  }
`;

export default Book;
