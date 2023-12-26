import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Book from "../entities/Book";

import { IBook } from "@/models/response/Book/IBook";
import { useCatalog } from "@/Contexts/Catalog/CatalogContext";
import EmptyFilter from "../entities/EmptyFilter";

type BookListProps = {
  books: IBook[];
  isAuth: boolean;
  className?: string;
  isAdded?: boolean;
  searchValue?: string;
};

const BookList: React.FC<BookListProps> = (props) => {
  const router = useRouter();
  const { catalogState, setCatalog, setSearchFilter } = useCatalog();

  function handleClick(book: IBook) {
    router.push(`/catalog/${book._id}`);
  }

  useEffect(() => {
    if (props.searchValue) {
      setSearchFilter(props.searchValue);
    } else {
      setSearchFilter("");
    }
  }, [props.searchValue]);

  return catalogState.searchCatalog.length !== 0 ? (
    <StyledBookList className={props.className}>
      {catalogState.searchCatalog.map((book) => (
        <Book
          book={book}
          isAdded={props.isAdded}
          onClick={handleClick}
          key={book._id}
          isAuth={props.isAuth}
        />
      ))}
    </StyledBookList>
  ) : (
    <EmptyFilter
      title="Мы не смогли найти книгу по данному запросу"
      text="Уточинте свой запрос"
    />
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
