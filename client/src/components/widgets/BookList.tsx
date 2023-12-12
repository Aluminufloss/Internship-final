import React from "react";
import styled from "styled-components";
import Book from "../entities/Book";

const BookList: React.FC = () => {
  return (
    <StyledBookList>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
      <Book/>
    </StyledBookList>
  );
};

const StyledBookList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  grid-template-rows: repeat(2, minmax(333px, min-content));
  grid-auto-rows: 333px;
  gap: 30px 20px;
  margin-bottom: 40px;
`;

export default BookList;
