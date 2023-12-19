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

  return (
    <StyledUserCart className={props.className} cart={props.cart}>
      {props.cart.map((book) => (
        <CartBook
          book={book}
          key={book._id}
        />
      ))}
      <div className="price">
        <Text className="price__text" color="dark">Total:</Text>
        <Text className="price__amount" color="dark">38</Text>
      </div>

      <div className="buttons__group">
        <Button
          className="buttons__group--catalog"
          type="secondary"
          width="268"
          height="35"
        >
          Continue shopping
        </Button>
        <Button
          className="buttons__group--checkout"
          type="primary"
          width="174"
          height="35"
        >
          Checkout
        </Button>
      </div>
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
