import React, { useState } from "react";
import styled from "styled-components";
import { IBook } from "@/models/response/Book/IBook";
import CartBook from "../entities/CartBook";

type CartProps = {
  cart: IBook[];
  className?: string;
};

const UserCart: React.FC<CartProps> = (props) => {
  const [price, setPrice] = useState(0);

  function handleAddToTheTotal(bookPrice: number) {
    setPrice(price + bookPrice);
  }

  console.log("susys", price)

  return (
    <StyledUserCart className={props.className} cart={props.cart}>
      {props.cart.map((book, index) => (
        <CartBook
          book={book}
          key={index}
          handleAddToTheTotal={handleAddToTheTotal}
        />
      ))}
    </StyledUserCart>
  );
};

const StyledUserCart = styled.ul<CartProps>`
  width: 100%;
  margin-bottom: 70px;

  li:not(:last-child) {
    &::after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 1px;
      margin-bottom: 30px;
      background-color: ${(props) => `${props.theme.colors.light}`};
    }
  }
`;

export default UserCart;
