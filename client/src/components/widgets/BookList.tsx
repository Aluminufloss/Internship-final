import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Book from "../entities/Book";

import { IBook } from "@/models/response/Book/IBook";

type BookListProps = {
  books: IBook[];
}

const BookList: React.FC<BookListProps> = (props) => {
  const router = useRouter();

  function handleClick(book: IBook) {
    router.push(`/catalog/${book._id}`)
  }

  return (
    <StyledBookList>
      {props.books.map((book) => <Book book={book} onClick={handleClick}/>)}
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
