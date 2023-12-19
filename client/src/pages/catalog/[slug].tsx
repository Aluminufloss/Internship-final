import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import cookie from "cookie";

import BookService from "@/services/BookService";
import AuthService from "@/services/AuthService";

import { IBook } from "@/models/response/Book/IBook";
import { IUser } from "@/models/response/Auth/IUser";

import Layout from "@/components/layout/Layout";

import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";

import { useAuth } from "@/Contexts/UserContext";
import BookInformation from "@/components/widgets/BookInformation";
import BannerBottom from "@/components/entities/BannerBottom";
import CreateComment from "@/components/features/CreateComment";
import { IComment } from "@/models/response/Comment/IComment";
import Comments from "@/components/widgets/Comments";

type BookDetailsProps = {
  book: IBook;
  user: IUser;
  isAuth: boolean;
  accessToken: string;
  comments: IComment[];
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { state, setUser } = useAuth();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header isAuth={props.isAuth} />
        <BookInformation book={props.book} />
        {!props.isAuth ? (
          <BannerBottom
            bannerTitle="Authorize now"
            bannerSubtitle="Authorize now and discover the fabulous world of books"
            buttonText="Log In/ Sing Up"
          />
        ) : (
          <>
            <Comments comments={props.comments}/>
            <CreateComment
              bookID={props.book._id as string}
              accessToken={props.accessToken}
            />
          </>
        )}
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

    if (typeof rToken !== "undefined") {
      console.log("We're here");
      ctx.res.setHeader("Set-Cookie", [
        `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
        cookie.serialize("accessToken", aToken, {
          httpOnly: true,
          maxAge: 1 * 1 * 15 * 60 * 1000,
          path: "/",
        }),
        cookie.serialize("refreshToken", rToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        }),
      ]);
    }

    /**
     * If we have user, we will try to get books
     */
    try {
      const { slug } = ctx.params as IParams;
      const bookResponse = await BookService.getBook(slug);
      const book = bookResponse.data;

      const commentsResponse = await BookService.getComments(book._id as string, aToken);
      const comments = commentsResponse.data;

      const refreshToken = commentsResponse.config.headers.token;
      const accessToken = commentsResponse.config.headers.Authorization.split(" ")[1];

      if (typeof refreshToken !== 'undefined') {
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
       * If we have user and book
       */
      return {
        props: {
          user,
          isAuth: true,
          book,
          accessToken: aToken,
          comments: comments,
        },
      };
    } catch (err) {
      /**
       * If we have user but not book
       */
      return {
        props: {
          user,
          isAuth: true,
          book: {},
          accessToken: aToken,
          comments: [],
        },
      };
    }
  } catch (err) {
    /**
     * If we don't have user but we will try to get books
     */
    try {
      const { slug } = ctx.params as IParams;
      const bookResponse = await BookService.getBook(slug);
      const book = bookResponse.data;
      return {
        props: {
          user: {},
          isAuth: false,
          book,
          accessToken: "",
          comments: [],
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
          accessToken: "",
          comments: [],
        },
      };
    }
  }
};

export default BookDetails;
