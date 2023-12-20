import React, { useEffect } from "react";
import { GetServerSideProps } from "next";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import BookList from "@/components/widgets/BookList";

import EmptyCart from "@/components/entities/EmptyCart";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { useAuth } from "@/Contexts/UserContext";

import { IBook } from "@/models/response/Book/IBook";
import { IUser } from "@/models/response/Auth/IUser";

import { checkTokens } from "@/utils/helper/helper";
import { useBook } from "@/Contexts/BookContext";

type Props = {
  books: IBook[];
  user: IUser;
  isAuth: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};

const Cart: React.FC<Props> = (props) => {
  const { state, setUser, setTokens } = useAuth();
  const { stateBook, setBooks } = useBook();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      setBooks(props.books);
      console.log("books", props.books);

      if (typeof props.tokens !== "undefined") {
        setTokens(props.tokens.accessToken, props.tokens.refreshToken);
      }
    })();
  }, []);

  return (
    <Layout>
      <Header isAuth={state.isAuth} />
      {props.books.length === 0 ? (
        <EmptyCart
          title="Your list of favorite books is empty"
          text="Add items to the list. Go to the catalogue."
        />
      ) : (
        <BookList
          className="favorite__book-list"
          books={props.books}
          isAdded={true}
          isAuth={state.isAuth}
        />
      )}
      <Footer />
    </Layout>
  );
};

export default Cart;

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
      // console.log("Token", aToken);
      const responseBooks = await AuthService.getFavoriteBooks(aToken, rToken);
      const books = responseBooks.data;
      const {
        context,
        aToken: accessToken,
        rToken: refreshToken,
      } = checkTokens(responseBooks, ctx);
      ctx = context;

      /**
       * If we have user and books
       */
      return {
        props: {
          user,
          isAuth: true,
          books,
          tokens: { accessToken, refreshToken },
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
          tokens: { accessToken, refreshToken },
        },
      };
    }
  } catch (err) {
    /**
     * If we don't have user but we will try to get books
     */
    try {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    } catch (err) {
      /**
       * If we don't have user and books
       */
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  }
};
