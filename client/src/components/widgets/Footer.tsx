import React from "react";
import styled from "styled-components";
import Logo from "../shared/Logo";
import Text from "../shared/Text";
import LinkTo from "../shared/Link";

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
            tranthuy.nute@gmail.com (480)-555-0103
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
            6391 Elgin St. Celina, Delaware
            <br /> 10299
          </Text>
          <div className="map" />
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
    margin: 0 14px 30px 15px;
    padding-top: 73px;
  }

  .logo {
    margin-bottom: 30px;
  }

  .logo__text {
    overflow-wrap: normal;
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
    color: ${props => props.theme.colors.light};
  }

  .map {
    width: 100%;
    height: 160px;
    border-radius: 6px;
    background-image: url("images/map/map-small.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .map__container {
    display: flex;
    flex-direction: column;
    /* padding: 0 15px 30px; */
  }
`;

export default Footer;
