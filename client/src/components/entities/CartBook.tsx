import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Text from "../shared/Text";
import Button from "../shared/Button";
import { IBook } from "@/models/response/Book/IBook";
import { DEFAULT_IMAGE } from "@/utils/constant/constant";
import { convertRating } from "@/utils/helper/helper";
import { useAuth } from "@/Contexts/UserContext";

type BookProps = {
  book: IBook;
  className?: string;
};

const CartBook: React.FC<BookProps> = (props) => {
  const { state } = useAuth();
  const [orderAmount, setOrderAmount] = useState(1);

  return (
    <StyledCartBook book={props.book} className={props.className}>
      <div className="book__container">
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
        <div className="book__info">
          <Text
            className="book__title"
            fontSize="mediumBig"
            fontWeight="bold"
            color="dark"
          >
            {props.book.title}
          </Text>
          <Text
            className="book__author"
            fontSize="small"
            fontWeight="medium"
            color="dark"
          >
            {props.book.author}
          </Text>
          <div className="book__buttons">
            <span className="book__order-amount">{orderAmount}</span>
            <button className="book__delete-amount"></button>
          </div>
        </div>
      </div>
    </StyledCartBook>
  );
};

const StyledCartBook = styled.li<BookProps>`
  width: 100%;

  .book {
    &__image {
      width: 135px;
      height: 202px;
      margin-right: 20px;
    }

    &__container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-bottom: 70px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    &__title {
      margin-bottom: 14px;
    }

    &__author {
      margin-bottom: 30px;
    }

    &__buttons {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &__order-amount {
      font-size: ${(props) => `${props.theme.fontSizes.smallBig}`};
      font-weight: ${(props) => `${props.theme.fontWeights.semiBold}`};
      color: ${(props) => `${props.theme.colors.dark}`};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      &::before {
        content: "-";
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 22px;
        background-color: ${(props) => props.theme.colors.light};
        margin-right: 10px;
      }

      &::after {
        content: "+";
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 22px;
        background-color: ${(props) => props.theme.colors.light};
        margin-left: 10px;
      }
    }

    &__delete-amount {
      width: 18px;
      height: 18px;
      margin-left: auto;
      background-image: url("/images/icons/Delete.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .price {
    margin-bottom: 30px;
    display: flex;
    font-size: 24px;

    &__text {
      margin-right: 4px;
      font-weight: 500;
    }

    &__amount {
      font-weight: 700;
    }
  }

  .buttons__group {
    display: flex;
    flex-direction: column;

    &--catalog {
      width: 100%;
      margin-bottom: 18px;
    }

    &--checkout {
      width: 100%;
    }
  }
`;

export default CartBook;
