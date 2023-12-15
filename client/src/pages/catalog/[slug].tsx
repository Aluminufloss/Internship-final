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
import styled from "styled-components";

type BookDetailsProps = {
  book: IBook;
  user: IUser;
  isAuth: boolean;

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
        <Header isAuth={props.isAuth}/>
      </Layout>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { slug } = ctx.params as IParams;
    const bookResponse = await BookService.getBook(slug);
    const book = bookResponse.data;

    try {
      console.log("Sussy request", ctx.req.cookies)
      const { refreshToken, accessToken } = ctx.req.cookies;

      const response = await AuthService.getMe(
        refreshToken as string,
        accessToken as string
      );

      const { user, refreshToken: rToken, accessToken: aToken } = response.data;

      if (typeof rToken !== 'undefined') {
        console.log("We're here");
        ctx.res.setHeader("Set-Cookie", [
          `refreshToken=deleted; Max-Age=0`,
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

      return {
        props: { user, isAuth: true, book },
      };
    } catch (err) {
      console.log("Something wrong with getting user", err);
      return { 
        props: {
          user: {}, 
          isAuth: false, 
          book 
        }
      };
    }
  } catch (err) {
    console.log("Something wrong with getting single book", err);
    return {
      props: {},
    };
  }
};

export default BookDetails;
