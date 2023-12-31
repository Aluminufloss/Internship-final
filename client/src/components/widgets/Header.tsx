import Text from "@/components/shared/Text";
import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import Search from "../shared/Search";
import ButtonLink from "../shared/ButtonLink";
import { useRouter } from "next/router";
import media from "@/utils/helper/helper";

type HeaderProps = {
  isAuth?: boolean;
  handleSearch?: (value: string) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [formType, setFormType] = useState("registration");
  const router = useRouter();

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (formType === "login") {
      setFormType("registration");
      router.push("/registration");
    } else {
      setFormType("login");
      router.push("/login");
    }
  }

  return (
    <StyledHeader>
      <Logo className="logo" type="largeBlack" />
      <Text fontSize="smallBig" className="text">
        Catalog
      </Text>
      {!props.isAuth ? (
        <Button
          width="135"
          height="38"
          type="primary"
          className="button"
          fontSize="small"
          onClick={(ev) => handleClick(ev)}
        >
          Log In/Sign Up
        </Button>
      ) : (
        <div className="btn-group">
          <ButtonLink
            className="btn-group__button"
            href="/cart"
            iconname="button_cart"
          />
          <ButtonLink
            className="btn-group__button"
            href="/favorite"
            iconname="button_save"
          />
          <ButtonLink
            className="btn-group__button"
            href="/user"
            iconname="button_user"
          />
        </div>
      )}
      <Search
        type="medium"
        className="search"
        handleSearch={props.handleSearch}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 115px;
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  column-gap: 14px;
  align-items: center;
  grid-template-rows: 1fr 1fr;

  .search {
    grid-column: span 3;
  }

  .button,
  .btn-group {
    justify-self: end;
  }

  .btn-group__button:not(:last-of-type) {
    margin-right: 18px;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    font-weight: 500;
  }

  ${media.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 86px;
      height: 46px;
    }

    .search {
      width: 40%;
      order: 3;
      z-index: 1000;
    }

    .btn-group,
    .button {
      order: 4;
    }

    .button {
      width: 231px;
      height: 44px;
      font-size: ${props => props.theme.fontSizes.medium};
    }
  }
`;
export default Header;
