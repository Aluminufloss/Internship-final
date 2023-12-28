import React from "react";
import styled from "styled-components";
import Logo from "../shared/Logo";
import Text from "../shared/Text";
import LinkTo from "../shared/Link";
import Image from "next/image";
import media from "@/utils/helper/helper";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <div className="footer__inner">
        <div className="logo__container">
          <Logo type="largeWhite" className="logo" />
          <Text
            fontSize="medium"
            fontWeight="medium"
            color="white"
            className="logo__text"
          >
            tranthuy.nute@gmail.com 
            <br/>(480)-555-0103
          </Text>
        </div>

        <div className="links__container">
          <LinkTo href="/catalog" className="link">
            Home Page
          </LinkTo>
          <LinkTo href="/catalog" className="link">
            Catalog
          </LinkTo>
          <LinkTo href="/user" className="link">
            My Account
          </LinkTo>
          <LinkTo href="/cart" className="link">
            Cart
          </LinkTo>
        </div>

        <div className="map__container">
          <Text fontSize="medium" fontWeight="medium" color="white">
            6391 Elgin St. Celina, Delaware 10299
          </Text>
          <Image
            width={1}
            height={1}
            src={"/images/map/map-small.png"}
            alt={"map"}
            className="map"
            unoptimized={true}
          />
        </div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 650px;

  background-color: ${(props) => props.theme.colors.dark};

  .footer__inner {
    padding: 73px 14px 30px 15px;
  }

  .logo {
    width: 88px;
    height: 46px;
    margin-bottom: 30px;
  }

  .links__container {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    margin-top: 40px;
  }

  .link:not(:last-child) {
    margin-bottom: 11px;
  }

  .link:hover {
    color: ${(props) => props.theme.colors.light};
  }

  .map {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .map__container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 160px;
    width: 291px;
  }

  ${media.tablet} {
    height: 341px;
    
    .footer__inner {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      padding: 73px 15px 79px 20px;
    }

    .links__container {
      margin: 0;
    }

    .map__container {
      width: 340px;
    }
  }
`;

export default Footer;
