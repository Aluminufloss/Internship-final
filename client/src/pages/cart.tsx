import React from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import Image from "next/image";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { useAuth } from "@/Contexts/UserContext";
import EmptyCart from "@/components/entities/EmptyCart";

type Props = {};

const Cart: React.FC<Props> = (props) => {
  const { state } = useAuth();

  return (
    <Layout>
      <Header isAuth={state.isAuth}/>
      <EmptyCart />
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
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};
