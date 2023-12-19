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

import { useAuth } from "@/Contexts/UserContext";

import AuthService from "@/services/AuthService";
import BookService from "@/services/BookService";

import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";

import { useBook } from "@/Contexts/BookContext";

type Props = {
  user: IUser;
  isAuth: boolean;
  books: IBook[];
};

const Home: React.FC<Props> = (props) => {
  const { setUser } = useAuth();
  const { setBooks } = useBook();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      setBooks(props.books);
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

        <BookList books={props.books} isAuth={props.isAuth}/>

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

    const { user, refreshToken: rToken, accessToken: aToken } = response.data;

    if (typeof rToken !== 'undefined') {
      console.log("We're here");
      ctx.res.setHeader("Set-Cookie", [
        `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
        cookie.serialize("accessToken", aToken, {
          httpOnly: true,
          maxAge: 1 * 1 * 15 * 60 * 1000,
        }),
        cookie.serialize("refreshToken", rToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }),
      ]);
    }

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
        props: { user, isAuth: true, books },
      };
    } catch (err) {
      /**
     * If we have user but not books
     */
      return {
        props: { user, isAuth: true, books: {} },
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
        },
      };
    }
  }
};

export default Home;
