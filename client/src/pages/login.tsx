import LoginForm from "@/components/features/LoginForm";
import Image from "next/image";
import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import React from "react";
import Layout from "@/components/layout/Layout";

type Props = {};

const Login: React.FC<Props> = (props) => {

  return (
    <Layout>
      <Header />
      <LoginForm />
      <Image
        src="/images/humans/human1-small.png"
        width={290}
        height={247}
        alt="Picture of the author"
        className="image"
        style={{marginBottom: "70px"}}
      />
      <Footer />
    </Layout>
  );
};

export default Login;
