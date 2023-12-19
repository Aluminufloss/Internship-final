import React from "react";
import styled, { css } from "styled-components";

import Text from "../shared/Text";
import Image from "next/image";
import { IBook } from "@/models/response/Book/IBook";
import Star from "../shared/Star";
import { convertRating } from "@/utils/helper/helper";
import UserRating from "../features/UserRating";
import Button from "../shared/Button";

type BookInformationProps = {
  book: IBook;
};

const BookInformation: React.FC<BookInformationProps> = (props) => {
  const rating = convertRating(props.book.rating);

  return (
    <StyledBookDetails book={props.book}>
      <Image
        className="book__image"
        width={135}
        height={202}
        src={props.book.imagePath}
        alt="Book image"
      />
      <div className="book__information--container">
        <Text
          className="book__title"
          color="dark"
          fontWeight="bold"
          fontSize="mediumBig"
        >
          {props.book.title}
        </Text>
        <Text
          className="book__author"
          color="dark"
          fontWeight="medium"
          fontSize="small"
        >
          {props.book.author}
        </Text>
        <div className="book__rating--container">
          <Star flag="full" />
          <span className="book__rating">{rating}</span>
        </div>
        <UserRating className="book__user-rating" />
      </div>
      <Text
        className="book__title--description"
        color="dark"
        fontWeight="medium"
        fontSize="smallBig"
      >
        Description
      </Text>
      <Text
        className="book__description"
        color="darkBlue"
        fontWeight="medium"
        fontSize="small"
      >
        {props.book.description}
      </Text>

      <div className="book__buttons-group">
        <div className="paperback">
          <Text
            className="book__text--paperback"
            color="darkBlue"
            fontWeight="medium"
            fontSize="smallBig"
          >
            Paperback
          </Text>
          <Button type="primary" width="135" height="38">
            dddd
          </Button>
        </div>

        <div className="hardcover">
          <Text
            className="book__text--hardcover"
            color="darkBlue"
            fontWeight="medium"
            fontSize="smallBig"
          >
            Hardcover
          </Text>
          <Button type="primary" width="135" height="38">
            dddd
          </Button>
        </div>
      </div>
    </StyledBookDetails>
  );
};

const StyledBookDetails = styled.div<BookInformationProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(135px, 1fr));
  grid-column-gap: 20px;
  margin-bottom: 50px;

  .book {
    &__image {
      grid-column: 1 / 2;
    }

    &__title {
      margin-bottom: 14px;
    }

    &__author {
      margin-bottom: 21px;
    }

    &__information--container {
      grid-column: 2 / 3;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__rating--container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }

    &__rating {
      margin-left: 7px;
    }

    &__description {
      grid-column: 1 / 3;
      text-align: justify;
      margin-bottom: 30px;
    }

    &__title--description {
      margin-top: 20px;
      margin-bottom: 15px;
    }

    &__buttons-group {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    &__text--hardcover, &__text--paperback {
      margin-bottom: 17px;
    }
  }
`;

export default BookInformation;
