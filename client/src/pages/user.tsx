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
import { DEFAULT_IMAGE } from "@/utils/constant/constant";
import { encodeImageToBase64String } from "@/utils/helper/helper";

// import { getServerSideProps } from "@/utils/helper/helper";

type Props = {
  user: IUser;
  isAuth: boolean;
};

const User: React.FC<Props> = (props) => {
  const { state, setUser } = useAuth();
  const [avatar, setAvatar] = useState<File>();
  const [decodedImage, setDecodedImage] = useState<string>();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
    })();
  }, []);

  async function handleUploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const image = e.target.files![0];
    const imageBase64 = await encodeImageToBase64String(image);
    setAvatar(image);
    setDecodedImage(imageBase64);
  }

  return (
    <Layout>
      <Header isAuth={state.isAuth} />
      {state.user ? (
        <>
          <Avatar
            uploadPhoto={handleUploadPhoto}
            avatar={props.user.imagePath!}
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

    console.log("Refresh", rToken);

    if (rToken !== undefined) {
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
