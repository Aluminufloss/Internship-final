import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import Text from "../shared/Text";

import { IBook } from "@/models/response/Book/IBook";

import { DEFAULT_IMAGE } from "@/utils/constant/constant";

import { useAuth } from "@/Contexts/User/UserContext";

import { correctPrice } from "@/utils/helper/helper";

type BookProps = {
  book: IBook;
  handleAddToTheTotal: (bookPrice: number) => void;
  className?: string;
};

const CartBook: React.FC<BookProps> = (props) => {
  const { userState } = useAuth();
  const [totalPrice, setTotalPrice] = useState(props.book.price);
  const [orderAmount, setOrderAmount] = useState(1);

  const price = correctPrice(totalPrice);

  function handleClickDecrease() {
    const amount = orderAmount !== 1 ? orderAmount - 1 : orderAmount;
    setOrderAmount(amount);
    setTotalPrice(props.book.price * amount);

    if (amount !== 1) {
      props.handleAddToTheTotal(-props.book.price);
    }
  }

  function handleClickIncrease() {
    const amount = orderAmount !== 10 ? orderAmount + 1 : orderAmount;
    setOrderAmount(amount);
    setTotalPrice(props.book.price * amount);

    if (amount !== 10) {
      props.handleAddToTheTotal(props.book.price);
    }
  }

  async function handleDelete() {
    try {
      // deleteFromCart(
      //   props.book._id!,
      //   userState.accessToken as string,
      //   userState.refreshToken as string
      // );
      props.handleAddToTheTotal(-totalPrice);
    } catch (err) {
      throw err;
    }
  }

  return (
    <StyledCartBook
      book={props.book}
      className={props.className}
      handleAddToTheTotal={props.handleAddToTheTotal}
    >
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
            <div className="book__order-amount">
              <button
                className="book__order-amount--minus"
                onClick={handleClickDecrease}
              >
                -
              </button>
              {orderAmount}
              <button
                className="book__order-amount--plus"
                onClick={handleClickIncrease}
              >
                +
              </button>
            </div>
            <button
              className="book__delete-amount"
              onClick={handleDelete}
            ></button>
          </div>

          <Text
            className="book__price"
            color="dark"
            fontSize="smallBig"
            fontWeight="medium"
          >
            {price}
          </Text>
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
      margin-bottom: 30px;
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
      margin-bottom: 32px;
    }

    &__order-amount {
      font-size: ${(props) => `${props.theme.fontSizes.smallBig}`};
      font-weight: ${(props) => `${props.theme.fontWeights.semiBold}`};
      color: ${(props) => `${props.theme.colors.dark}`};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      &--minus {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 22px;
        background-color: ${(props) => props.theme.colors.light};
        margin-right: 10px;
      }

      &--plus {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 22px;
        background-color: ${(props) => props.theme.colors.light};
        margin-left: 10px;
      }

      & button:hover {
        transform: scale(1.05);
        background-color: ${(props) => props.theme.colors.darkGrey};
      }
    }

    &__delete-amount {
      width: 18px;
      height: 18px;
      margin-left: auto;
      background-image: url("/images/icons/Delete.svg");
      background-repeat: no-repeat;
      background-size: cover;

      &:active {
        transform: translateY(2px);
      }
    }
  }
`;

export default CartBook;
