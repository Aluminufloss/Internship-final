import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import React from "react";
import Layout from "@/components/layout/Layout";
import Avatar from "@/components/entities/Avatar";
import UserForm from "@/components/features/UserForm";

type Props = {};

const Login: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Header />
        <Avatar />
        <UserForm />
      <Footer />
    </Layout>
  );
};

export default Login;
