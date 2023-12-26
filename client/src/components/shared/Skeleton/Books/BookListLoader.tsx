import React, { useEffect } from "react";
import styled from "styled-components";
import BookLoader from "./BookLoader";

type BookListLoaderProps = {};

const BookListLoader: React.FC<BookListLoaderProps> = (props) => {
  return (
    <StyledBookList>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => <BookLoader />)}
    </StyledBookList>
  )
};

const StyledBookList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  grid-template-rows: repeat(4, minmax(333px, min-content));
  gap: 30px 20px;
`;

export default BookListLoader;
