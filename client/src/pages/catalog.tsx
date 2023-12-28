import React, { useState } from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/Layout";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import BookList from "@/components/widgets/BookList";

import Filtres from "@/components/features/Filtres";

import BannerTop from "@/components/entities/BannerTop";
import BannerBottom from "@/components/entities/BannerBottom";
import Pagination from "@/components/entities/Pagination";

import AuthService from "@/services/AuthService";
import BookService from "@/services/BookService";

import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";

import { checkTokens } from "@/utils/helper/helper";

type Props = {
  user: IUser;
  isAuth: boolean;
  books: IBook[];
  hasNextPage: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};

const Home: React.FC<Props> = (props) => {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(value: string) {
    setSearchValue(value);
  }

  return (
    <>
      <Layout>
        <Header handleSearch={handleSearch} isAuth={props.isAuth}/>
        <BannerTop
          bannerTitle="Build your library with us"
          bannerSubtitle="Buy two books and get one for free"
          buttonText="Choose a book"
        />

        <Filtres />

        <BookList
          books={props.books}
          isAdded={false}
          searchValue={searchValue}
        />

        {props.hasNextPage && <Pagination />}

        {!props.isAuth && <BannerBottom
          bannerTitle="Authorize now"
          bannerSubtitle="Authorize now and discover the fabulous world of books"
          buttonText="Log In/ Sing Up"
        />}
      </Layout>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { refreshToken, accessToken } = ctx.req.cookies;
    const filter = ctx.query.filter ?? "";
    const genre = ctx.query.genre ?? "";
    const page = ctx.query.page ?? "";

    const response = await AuthService.getMe(
      refreshToken as string,
      accessToken as string
    );

    const { user } = response.data;
    const { aToken, rToken } = checkTokens(response, ctx);

    /**
     * If we have user, we will try to get books
     */
    try {
      const responseBooks = await BookService.getBooks(filter, genre, page);
      const books = responseBooks.data.books;
      const hasNextPage = responseBooks.data.hasNextPage;

      /**
       * If we have user and books
       */
      return {
        props: {
          user,
          isAuth: true,
          books,
          hasNextPage,
          tokens: { accessToken: aToken, refreshToken: rToken },
        },
      };
    } catch (err) {
      /**
       * If we have user but not books
       */
      return {
        props: {
          user,
          isAuth: true,
          books: [],
          hasNextPage: false,
          tokens: { accessToken: aToken, refreshToken: rToken },
        },
      };
    }
  } catch (err) {
    /**
     * If we don't have user but we will try to get books
     */
    try {
      const filter = ctx.query.filter ?? "";
      const genre = ctx.query.genre ?? "";
      const page = ctx.query.page ?? "";

      const responseBooks = await BookService.getBooks(filter, genre, page);
      const books = responseBooks.data.books;
      const hasNextPage = responseBooks.data.hasNextPage;

      return {
        props: {
          user: {},
          isAuth: false,
          books,
          hasNextPage,
          tokens: { aToken: "", rToken: "" },
        },
      };
    } catch (err) {
      /**
       * If we don't have user and books
       */
      return {
        props: {
          user: {},
          isAuth: false,
          hasNextPage: false,
          books: [],
          tokens: { aToken: "", rToken: "" },
        },
      };
    }
  }
};

export default Home;
