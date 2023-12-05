import React from "react";
import Image from "next/image";

import RegistrationForm from "@/components/features/RegistrationForm";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import Layout from "@/components/layout/Layout";

type Props = {};

const Login: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Header />
      <RegistrationForm />
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
