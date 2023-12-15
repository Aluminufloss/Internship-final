import React from "react";
import styled from "styled-components";
import Text from "../shared/Text";
import Button from "../shared/Button";
import StarRating from "../features/StarRating";
import { IBook } from "@/models/response/Book/IBook";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/utils/constant/constant";
import { convertRating } from "@/utils/helper/helper";

type BookProps = {
  book: IBook;
  onClick: (book: IBook) => void; 
};

const Book: React.FC<BookProps> = (props) => {
  const price = Number.isInteger(props.book.price)
    ? `$ ${props.book.price}.00 USD`
    : `$ ${props.book.price} USD`;

  const rating = convertRating(props.book.rating);

  return (
    <StyledBook book={props.book} onClick={ev => props.onClick(props.book)}>
      <div className="book__image--container">
        <Image
          className="book__image"
          width={1}
          height={1}
          src={props.book.imagePath}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE.default;
          }}
          alt="Book cover"
          unoptimized={true}
        />
        <button className="book__like-btn"></button>
      </div>
      <Text
        className="book__title"
        fontSize="smallBig"
        fontWeight="medium"
        color="darkBlue"
      >
        {props.book.title}
      </Text>
      <Text
        className="book__author"
        fontSize="small"
        fontWeight="semiBold"
        color="darkGrey"
      >
        {props.book.author}
      </Text>
      <StarRating className="book__rating" rating={rating}/>
      <Button
        className="book__buy-btn"
        type="primary"
        width="100"
        height="34"
        fontSize="smallBig"
        disabled={props.book.amount === 0 ? true : false}
      >
        {props.book.amount !== 0 ? price : "Not available"}
      </Button>
    </StyledBook>
  );
};

const StyledBook = styled.li<BookProps>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;

  .book {
    &__image {
      width: 100%;
      height: 58%;
      margin-bottom: 15px;
    }

    &__image {
      width: 100%;
      height: 100%;
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
