import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import Layout from "@/components/layout/Layout";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import BookList from "@/components/widgets/BookList";

import Filtres from "@/components/features/Filtres";

import BannerTop from "@/components/entities/BannerTop";
import BannerBottom from "@/components/entities/BannerBottom";

import { useAuth } from "@/Contexts/User/UserContext";

import AuthService from "@/services/AuthService";
import BookService from "@/services/BookService";

import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";

import { checkTokens } from "@/utils/helper/helper";
import Pagination from "@/components/entities/Pagination";
import { useCatalog } from "@/Contexts/Catalog/CatalogContext";

type Props = {
  user: IUser;
  isAuth: boolean;
  books: IBook[];
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};

const Home: React.FC<Props> = (props) => {
  const { setUser, setTokens } = useAuth();
  const { catalogState, setCatalog } = useCatalog();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      setCatalog(props.books);

      if (typeof props.tokens !== "undefined") {
        setTokens(props.tokens.accessToken, props.tokens.refreshToken);
      }
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header isAuth={props.isAuth} />
        <BannerTop
          bannerTitle="Build your library with us"
          bannerSubtitle="Buy two books and get one for free"
          buttonText="Choose a book"
        />

        <Filtres />

        {typeof catalogState !== "undefined" ? (
          <BookList books={props.books} isAuth={props.isAuth} isAdded={false} />
        ): "Loading"}

        <Pagination />

        <BannerBottom
          bannerTitle="Authorize now"
          bannerSubtitle="Authorize now and discover the fabulous world of books"
          buttonText="Log In/ Sing Up"
        />
      </Layout>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { refreshToken, accessToken } = ctx.req.cookies;

    const response = await AuthService.getMe(
      refreshToken as string,
      accessToken as string
    );

    const { user } = response.data;
    const { context, aToken, rToken } = checkTokens(response, ctx);
    ctx = context;

    /**
     * If we have user, we will try to get books
     */
    try {
      const responseBooks = await BookService.getBooks();
      const books = responseBooks.data;

      /**
       * If we have user and books
       */
      return {
        props: {
          user,
          isAuth: true,
          books,
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
          books: {},
          tokens: { accessToken: aToken, refreshToken: rToken },
        },
      };
    }
  } catch (err) {
    /**
     * If we don't have user but we will try to get books
     */
    try {
      const responseBooks = await BookService.getBooks();
      const books = responseBooks.data;
      return {
        props: {
          user: {},
          isAuth: false,
          books,
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
          books: {},
          tokens: { aToken: "", rToken: "" },
        },
      };
    }
  }
};

export default Home;
