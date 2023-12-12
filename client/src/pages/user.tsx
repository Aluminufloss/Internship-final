import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import { cookies } from "next/headers";

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
  user: IUser;
  isAuth: boolean;
};

const User: React.FC<Props> = (props) => {
  const { state, setUser } = useAuth();
  const [avatar, setAvatar] = useState<File>();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      // const image = getUserAvatar(props.user.id);
    })();
  }, []);

  function handleUploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files![0];
    setAvatar(file);
  }

  return (
    <Layout>
      <Header isAuth={state.isAuth} />
      {state.user ? (
        <>
          <Avatar
            uploadPhoto={handleUploadPhoto}
            avatar={avatar!}
            userID={state.user.id!}
          />
          <UserForm user={state.user} avatar={avatar!} />
        </>
      ) : (
        "Loading..."
      )}
      <Footer />
    </Layout>
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

export default User;
