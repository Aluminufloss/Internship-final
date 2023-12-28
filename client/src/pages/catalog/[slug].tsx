import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import BookService from "@/services/BookService";
import AuthService from "@/services/AuthService";

import { IBook } from "@/models/response/Book/IBook";
import { IUser } from "@/models/response/Auth/IUser";
import { IComment } from "@/models/response/Comment/IComment";

import Layout from "@/components/layout/Layout";

import Header from "@/components/widgets/Header";
import Footer from "@/components/widgets/Footer";

import { useAuth } from "@/Contexts/User/UserContext";
import BookInformation from "@/components/widgets/BookInformation";
import BannerBottom from "@/components/entities/BannerBottom";
import CreateComment from "@/components/features/CreateComment";
import Comments from "@/components/widgets/Comments";
import { checkTokens } from "@/utils/helper/helper";

type BookDetailsProps = {
  book: IBook;
  user: IUser;
  isAuth: boolean;
  tokens?: {
    accessToken: string,
    refreshToken: string,
  }
  comments: IComment[];
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { userState, setUser, setTokens } = useAuth();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      if (typeof props.tokens !== 'undefined') {
        setTokens(props.tokens.accessToken, props.tokens.refreshToken);
      }
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

    const { user } = response.data;
    const { context, aToken, rToken } = checkTokens(response, ctx);
    ctx = context;

    /**
     * If we have user, we will try to get books
     */
    try {
      const { slug } = ctx.params as IParams;
      const bookResponse = await BookService.getBook(slug);
      const book = bookResponse.data;

      const commentsResponse = await BookService.getComments(book._id as string, aToken);
      const comments = commentsResponse.data;
      const { context, aToken: accessToken, rToken: refreshToken } = checkTokens(commentsResponse, ctx);

      /**
       * If we have user and book
       */
      return {
        props: {
          user,
          isAuth: true,
          book,
          tokens: {
            accessToken,
            refreshToken,
          },
          comments,
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
          tokens: {
            accessToken,
            refreshToken,
          },
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
          tokens: {
            accessToken: "",
            refreshToken: "",
          },
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
          tokens: {
            accessToken: "",
            refreshToken: "",
          },
          comments: [],
        },
      };
    }
  }
};

export default BookDetails;
