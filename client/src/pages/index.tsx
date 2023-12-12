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

import { IUser } from "@/models/response/Auth/IUser";

type Props = {
  user: IUser;
  isAuth: boolean;
};

const Home: React.FC<Props> = (props) => {
  const { setUser } = useAuth();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
    })();
  }, []);

  return (
    <>
    <Layout>
      <Header isAuth={props.isAuth}/>
      <BannerTop
        bannerTitle="Build your library with us"
        bannerSubtitle="Buy two books and get one for free"
        buttonText="Choose a book"
      />

      <Filtres />

      <BookList />

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
    console.log("Resp", response.data);
    const { user, refreshToken: rToken, accessToken: aToken } = response.data;

    if (rToken !== undefined) {
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
      props: { user, isAuth: true },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        user: {},
        isAuth: false,
      },
    };
  }
};

export default Home;
