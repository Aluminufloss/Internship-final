import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import Layout from "@/components/layout/Layout";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import UserForm from "@/components/features/UserForm";

import Avatar from "@/components/entities/Avatar";

import { useAuth } from "@/Contexts/UserContext";
import AuthService from "@/services/AuthService";
import { IUser } from "@/models/response/Auth/IUser";

// import { getServerSideProps } from "@/utils/helper/helper";

type Props = {
  user: IUser,
  isAuth: boolean,
};

const User: React.FC<Props> = (props) => {
  const { state, setUser } = useAuth();
  console.log("here", props);
  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
    })();
  }, []);
  
  return (
    <Layout>
      <Header />
        <Avatar />
        <UserForm />
      <Footer />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  try {
    const { refreshToken, accessToken } = ctx.req.cookies;

    const response = await AuthService.getMe(refreshToken as string, accessToken as string);
    console.log("Resp", response.data);
    const { user, refreshToken: rToken, accessToken: aToken } = response.data;
    console.log("sus ", aToken);

    if (rToken !== undefined) {

      ctx.res.setHeader("Set-cookie", cookie.serialize("refreshToken", ""));

      ctx.res.setHeader("Set-cookie", cookie.serialize("refreshToken", rToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }));

      ctx.res.setHeader("Set-cookie", cookie.serialize("accessToken", aToken, {
        httpOnly: true,
        maxAge: 1 * 1 * 15 * 60 * 1000,
      }));
    }
    
    return {
      props: { user, isAuth: true },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        user: {
          email: "",
          id: "",
        },
        isAuth: false,
      },
    };
  }
}

export default User;
