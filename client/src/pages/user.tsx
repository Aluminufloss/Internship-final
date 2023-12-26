import React from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/Layout";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import UserForm from "@/components/features/UserForm";

import Avatar from "@/components/entities/Avatar";

import { useAuth } from "@/Contexts/User/UserContext";
import AuthService from "@/services/AuthService";
import { IUser } from "@/models/response/Auth/IUser";
import { checkTokens, encodeImageToBase64String } from "@/utils/helper/helper";

type Props = {
  user: IUser;
  tokens?: { 
    aToken: string, 
    rToken: string, 
  }
};

const User: React.FC<Props> = (props) => {
  const { userState, uploadImage } = useAuth();

  async function handleUploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const image = e.target.files![0];
    const base64Image = await encodeImageToBase64String(image);
    uploadImage(userState.user.id!, base64Image);
  }

  return (
    <Layout>
      <Header isAuth={userState.isAuth} />
      {userState.user ? (
        <>
          <Avatar
            uploadPhoto={handleUploadPhoto}
            avatar={props.user.imagePath!}
          />
          <UserForm user={userState.user} />
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

    const { user } = response.data;
    const { rToken, aToken } = checkTokens(response, ctx);

    return {
      props: { user, isAuth: true, tokens: { aToken, rToken } },
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
