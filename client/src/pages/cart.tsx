import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { useAuth } from "@/Contexts/UserContext";
import EmptyCart from "@/components/entities/EmptyCart";
import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";
import UserCart from "@/components/widgets/UserCart";
<<<<<<< HEAD
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
=======
import { checkTokens } from "@/utils/helper/helper";
import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";
import styled from "styled-components";
import { useRouter } from "next/router";
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d

type Props = {
  user: IUser;
  isAuth: boolean;
  cart: IBook[];
};

const Cart: React.FC<Props> = (props) => {
  const { state, setUser, setCart } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  function handleRedirectToCatalog() {
    router.push("/catalog");
  }

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
<<<<<<< HEAD
        <>
          <UserCart cart={props.cart} />
=======
        <StyledCart>
          <UserCart cart={props.cart}/>
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d
          <div className="price">
            <Text className="price__text" color="dark">
              Total:
            </Text>
            <Text className="price__amount" color="dark">
<<<<<<< HEAD
              38
=======
              {totalPrice}
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d
            </Text>
          </div>

          <div className="buttons__group">
            <Button
              className="buttons__group--catalog"
              type="secondary"
              width="268"
              height="35"
<<<<<<< HEAD
=======
              onClick={handleRedirectToCatalog}
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d
            >
              Continue shopping
            </Button>
            <Button
              className="buttons__group--checkout"
              type="primary"
              width="174"
              height="35"
<<<<<<< HEAD
=======
              onClick={handleRedirectToCatalog}
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d
            >
              Checkout
            </Button>
          </div>
<<<<<<< HEAD
        </>
=======
        </StyledCart>
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d
      )}
      <Footer />
    </Layout>
  );
};

export default Cart;

const StyledCart = styled.div`
  width: 100%;
  margin-bottom: 100px;

  .price {
    margin-bottom: 30px;
    display: flex;
    font-size: 24px;

    &__text {
      margin-right: 4px;
      font-weight: 500;
    }

    &__amount {
      font-weight: 700;
    }
  }

  .buttons__group {
    display: flex;
    flex-direction: column;

    &--catalog {
      width: 100%;
      margin-bottom: 18px;
    }

    &--checkout {
      width: 100%;
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { refreshToken, accessToken } = ctx.req.cookies;

    const response = await AuthService.getMe(
      refreshToken as string,
      accessToken as string
    );

    const { user } = response.data;
    const { context, aToken, rToken } = checkTokens(response, ctx);
    ctx = context;

    try {
      const cartResponse = await AuthService.getCart(
        aToken as string,
        rToken as string
      );

      const cart = cartResponse.data;
<<<<<<< HEAD

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
=======
      const {
        context,
        aToken: accessToken,
        rToken: refreshToken,
      } = checkTokens(response, ctx);
      ctx = context;
>>>>>>> dd2890365e60632d25c477e174c3c05be613cb1d

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
