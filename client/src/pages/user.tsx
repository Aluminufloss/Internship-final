import React, { useEffect } from "react";
import { GetServerSideProps } from "next";

import Layout from "@/components/layout/Layout";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import UserForm from "@/components/features/UserForm";

import Avatar from "@/components/entities/Avatar";

import { useAuth } from "@/Contexts/UserContext";
import AuthService from "@/services/AuthService";

// import { getServerSideProps } from "@/utils/helper/helper";

type Props = {};

const User: React.FC<Props> = (props) => {
  const { state, setUser } = useAuth();
  console.log("here", props);
  // useEffect(() => {
  //   (async () => {
  //     const response = await getServerSideProps();
  //     setUser(response.props.user, response.props.isAuth);
  //   })();
  // }, []);
  
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
    const response = await AuthService.getMe();
    console.log(response);
    return {
      props: { user: response.data.user, isAuth: true },
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
