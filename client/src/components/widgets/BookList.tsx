import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Book from "../entities/Book";
import EmptyFilter from "../entities/EmptyFilter";

import { IBook } from "@/models/response/Book/IBook";

import { useAuth } from "@/Contexts/User/UserContext";
import media from "@/utils/helper/helper";

type BookListProps = {
  books: IBook[];
  className?: string;
  isAdded?: boolean;
  searchValue?: string;
};

const BookList: React.FC<BookListProps> = (props) => {
  const { userState } = useAuth();
  const router = useRouter();

  function handleClick(book: IBook) {
    router.push(`/catalog/${book._id}`);
  }

  return props.books.length !== 0 ? (
    <StyledBookList className={props.className}>
      {props.books.map((book) => (
        <Book
          book={book}
          isAdded={props.isAdded}
          onClick={handleClick}
          key={book._id}
          isAuth={userState.isAuth}
        />
      ))}
    </StyledBookList>
  ) : (
    <EmptyFilter
      title="Мы не смогли найти книгу по данному запросу"
      text="Уточните свой запрос"
    />
  );
};

const StyledBookList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
  grid-template-rows: minmax(333px, min-content);
  gap: 30px 20px;
  margin-bottom: 40px;

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
    grid-template-rows: minmax(372px, min-content);
  }

  ${media.extraDesktop} {
    grid-template-columns: repeat(auto-fill, minmax(195px, 1fr));
  }
`;

export default BookList;
