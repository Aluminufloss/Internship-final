import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";

import Footer from "@/components/widgets/Footer";
import Header from "@/components/widgets/Header";
import UserCart from "@/components/widgets/UserCart";

import EmptyCart from "@/components/entities/EmptyCart";

import Button from "@/components/shared/Button";
import Text from "@/components/shared/Text";

import Layout from "@/components/layout/Layout";

import AuthService from "@/services/AuthService";

import { IUser } from "@/models/response/Auth/IUser";
import { IBook } from "@/models/response/Book/IBook";

import { useAuth } from "@/Contexts/User/UserContext";
import { useCart } from "@/Contexts/Cart/CartContext";

import { checkTokens } from "@/utils/helper/helper";

type Props = {
  user: IUser;
  isAuth: boolean;
  cart: IBook[];
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};

const Cart: React.FC<Props> = (props) => {
  const { userState, setUser, setTokens } = useAuth();
  const { cartState, setCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  function handleRedirectToCatalog() {
    router.push("/catalog");
  }

  useEffect(() => {
    (async () => {
      setUser(props.user, props.isAuth);
      setCart(props.cart);
      if (typeof props.tokens !== "undefined") {
        setTokens(props.tokens.accessToken, props.tokens.refreshToken);
      }
    })();
  }, []);

  return (
    <Layout>
      <Header isAuth={userState.isAuth} />
      {typeof cartState.cart !== 'undefined' && (
        <>
          {cartState.cart.length === 0 && (
            <EmptyCart
              title="Your cart is empty"
              text="Add items to cart to make a purchase.Go to the catalogue no."
            />
          )}
          {cartState.cart.length !== 0 && (
            <StyledCart>
              <UserCart cart={cartState.cart} />
              <div className="price">
                <Text className="price__text" color="dark">
                  Total:
                </Text>
                <Text className="price__amount" color="dark">
                  {totalPrice}
                </Text>
              </div>

              <div className="buttons__group">
                <Button
                  className="buttons__group--catalog"
                  type="secondary"
                  width="268"
                  height="35"
                  onClick={handleRedirectToCatalog}
                >
                  Continue shopping
                </Button>
                <Button
                  className="buttons__group--checkout"
                  type="primary"
                  width="174"
                  height="35"
                  onClick={handleRedirectToCatalog}
                >
                  Checkout
                </Button>
              </div>
            </StyledCart>
          )}
        </>
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
      const {
        context,
        aToken: accessToken,
        rToken: refreshToken,
      } = checkTokens(response, ctx);

      return {
        props: {
          user,
          isAuth: true,
          cart,
          tokens: { accessToken, refreshToken },
        },
      };
    } catch (err) {
      console.log(err);

      return {
        props: {
          user,
          isAuth: true,
          cart: [],
          tokens: { accessToken, refreshToken },
        },
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
