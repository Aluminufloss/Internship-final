import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import cookie from "cookie";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { useAuth } from "@/Contexts/UserContext";
import EmptyCart from "@/components/entities/EmptyCart";
import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";
import UserCart from "@/components/widgets/UserCart";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

type Props = {
  user: IUser;
  isAuth: boolean;
  cart: IBook[];
};

const Cart: React.FC<Props> = (props) => {
  const { state, setUser, setCart } = useAuth();

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      setCart(props.cart);
    })();
  }, []);

  return (
    <Layout>
      <Header isAuth={state.isAuth} />
      {!props.cart.length ? (
        <EmptyCart
          title="Your cart is empty"
          text="Add items to cart to make a purchase.Go to the catalogue no."
        />
      ) : (
        <>
          <UserCart cart={props.cart} />
          <div className="price">
            <Text className="price__text" color="dark">
              Total:
            </Text>
            <Text className="price__amount" color="dark">
              38
            </Text>
          </div>

          <div className="buttons__group">
            <Button
              className="buttons__group--catalog"
              type="secondary"
              width="268"
              height="35"
            >
              Continue shopping
            </Button>
            <Button
              className="buttons__group--checkout"
              type="primary"
              width="174"
              height="35"
            >
              Checkout
            </Button>
          </div>
        </>
      )}
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

    const { user } = response.data;

    const rToken = response.config.headers.token;
    const aToken = response.config.headers.Authorization.split(" ")[1];

    if (typeof rToken !== "undefined") {
      console.log("We're here");
      ctx.res.setHeader("Set-Cookie", [
        `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
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

    try {
      const cartResponse = await AuthService.getCart(
        aToken as string,
        rToken as string
      );

      const cart = cartResponse.data;

      const refreshToken = cartResponse.config.headers.token;
      const accessToken =
        cartResponse.config.headers.Authorization.split(" ")[1];

      if (typeof refreshToken !== "undefined") {
        console.log("We're here");
        ctx.res.setHeader("Set-Cookie", [
          `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
          cookie.serialize("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1 * 1 * 15 * 60 * 1000,
          }),
          cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
          }),
        ]);
      }

      return {
        props: { user, isAuth: true, cart },
      };
    } catch (err) {
      console.log(err);

      return {
        props: { user, isAuth: true, cart: [] },
      };
    }
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
