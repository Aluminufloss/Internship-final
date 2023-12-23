import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Book from "../entities/Book";

import { IBook } from "@/models/response/Book/IBook";
import { useCatalog } from "@/Contexts/Catalog/CatalogContext";

type BookListProps = {
  books: IBook[];
  isAuth: boolean;
  className?: string;
  isAdded?: boolean;
};

const BookList: React.FC<BookListProps> = (props) => {
  const router = useRouter();
  const { catalogState } = useCatalog();
  const catalog = catalogState ? catalogState.catalog.filter()

  function handleClick(book: IBook) {
    router.push(`/catalog/${book._id}`);
  }

  return (
    <StyledBookList className={props.className}>
      {props.books.map((book) => (
        <Book
          book={book}
          isAdded={props.isAdded}
          onClick={handleClick}
          key={book._id}
          isAuth={props.isAuth}
        />
      ))}
    </StyledBookList> 
  );
};

const StyledBookList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  grid-template-rows: repeat(2, minmax(333px, min-content));
  gap: 30px 20px;
`;

export default BookList;
