import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Book from "../entities/Book";

import { IBook } from "@/models/response/Book/IBook";
import CartBook from "../entities/CartBook";
import Text from "../shared/Text";
import Button from "../shared/Button";

type CartProps = {
  cart: IBook[];
  className?: string;
}

const UserCart: React.FC<CartProps> = (props) => {
  return (
    <StyledUserCart className={props.className} cart={props.cart}>
      {props.cart.map((book) => (
        <CartBook
          book={book}
          key={book._id}
        />
      ))}
    </StyledUserCart>
  );
};

const StyledUserCart = styled.ul<CartProps>`
  width: 100%;
  margin-bottom: 100px;

  li:last-child {
    &::after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: ${props => `${props.theme.colors.light}`};
    }
  }

`;

export default UserCart;
