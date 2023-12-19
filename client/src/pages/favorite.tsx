import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { useAuth } from "@/Contexts/UserContext";
import EmptyCart from "@/components/entities/EmptyCart";
import BookList from "@/components/widgets/BookList";
import { IBook } from "@/models/response/Book/IBook";
import { IUser } from "@/models/response/Auth/IUser";

type Props = {
  books: IBook[];
  user: IUser;
  isAuth: boolean;
};

const Cart: React.FC<Props> = (props) => {
  const { state, setUser, deleteFavorite } = useAuth();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
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
    const rToken = response.config.headers.token;
    const aToken = response.config.headers.Authorization.split(" ")[1];

    if (typeof rToken !== "undefined") {
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
      // console.log("Token", aToken);
      const responseBooks = await AuthService.getFavoriteBooks(aToken, rToken);
      const books = responseBooks.data;
      const refreshToken = responseBooks.config.headers.token;
      const accessToken =
        responseBooks.config.headers.Authorization.split(" ")[1];

      if (typeof refreshToken !== "undefined") {
        console.log("We're here 2");
        ctx.res.setHeader("Set-Cookie", [
          `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
          cookie.serialize("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1 * 1 * 15 * 60 * 1000,
          }),
          cookie.serialize("refreshToken", refreshToken as string, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          }),
        ]);
      }

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
