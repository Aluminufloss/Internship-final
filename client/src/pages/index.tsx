import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import React from "react";
import Layout from "@/components/layout/Layout";
import BannerTop from "@/components/entities/BannerTop";
import BannerBottom from "@/components/entities/BannerBottom";

type Props = {};

const Home: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Header />
      <BannerTop
        bannerTitle="Build your library with us"
        bannerSubtitle="Buy two books and get one for free"
        buttonText="Choose a book"
      />
      <BannerBottom
        bannerTitle="Authorize now"
        bannerSubtitle="Authorize now and discover the fabulous world of books"
        buttonText="Log In/ Sing Up"
      />
      <Footer />
    </Layout>
  );
};

export default Home;
