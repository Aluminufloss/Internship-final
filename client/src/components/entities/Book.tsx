import React from "react";
import styled from "styled-components";
import Text from "../shared/Text";
import Button from "../shared/Button";
import StarRating from "../features/StarRating";
import { IBook } from "@/models/response/Book/IBook";
import Image from "next/image";
import { DEFAULT_IMAGE } from "@/utils/constant/constant";
import { convertRating } from "@/utils/helper/helper";
import { useAuth } from "@/Contexts/User/UserContext";
import { useCart } from "@/Contexts/Cart/CartContext";
import { Router, useRouter } from "next/router";

type BookProps = {
  book: IBook;
  onClick: (book: IBook) => void;
  isAuth: boolean;
  isAdded?: boolean;
};

const Book: React.FC<BookProps> = (props) => {
  const router = useRouter();

  const { userState } = useAuth();
  const { addToCart } = useCart();

  const price = Number.isInteger(props.book.price)
    ? `$ ${props.book.price}.00 USD`
    : `$ ${props.book.price} USD`;

  const rating = convertRating(props.book.rating);

  async function handleAddToCart(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.stopPropagation();

    try {
      await addToCart(
        props.book._id!,
        userState.accessToken as string,
        userState.refreshToken as string
      );
    } catch (err) {
      throw err;
    }

    console.log("susdusdusdujds");
  }

  function handleDelete() {}

  return (
    <StyledBook
      book={props.book}
      onClick={(ev) => props.onClick(props.book)}
      isAuth={props.isAuth}
      isAdded={props.isAdded}
    >
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
        {props.isAuth &&
          (!props.isAdded ? (
            <button className="book__like-btn"></button>
          ) : (
            <button
              className="book__like-btn book__like-btn--added"
              onClick={handleDelete}
            ></button>
          ))}
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
      <StarRating className="book__rating" rating={rating} />
      <Button
        className="book__buy-btn"
        type="primary"
        width="100"
        height="34"
        fontSize="smallBig"
        onClick={(ev) => handleAddToCart(ev)}
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
  transition: all 0.3s ease;

  .book__image--container {
    position: relative;
    z-index: 100;
  }

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

    &__like-btn {
      position: absolute;
      top: 16px;
      left: 19px;
      width: 25px;
      height: 25px;
      z-index: 200;
      background-image: url("/images/buttons/button_save.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-color: transparent;

      &:hover {
        transform: scale(1.05);
      }

      &--added {
        width: 20px;
        height: 20px;
        padding: 2.5px;
        background-image: url("/images/icons/Delete.svg");
        background-color: ${(props) => props.theme.colors.white};
        border-radius: 22px;
        border: 1px solid ${(props) => props.theme.colors.black};
      }
    }

    &__author {
      margin-bottom: 12px;
    }

    &__rating {
      margin-bottom: 16px;
    }
  }

  &:hover {
    /* transform: scale(1.05); */
  }
`;

export default Book;
