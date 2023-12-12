import Text from "@/components/shared/Text";
import React from "react";
import styled from "styled-components";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import Search from "../shared/Search";
import ButtonLink from "../shared/ButtonLink";

type HeaderProps = {
  isAuth?: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <StyledHeader>
      <Logo type="smallWhite" className="logo" />
      <Text fontSize="smallBig" className="text">
        Catalog
      </Text>
      {!props.isAuth ? <Button
        width="135"
        height="38"
        type="primary"
        className="button"
        fontSize="small"
      >
        Log In/ Sing Up
      </Button> : 
        <div className="btn-group">
          <ButtonLink className="btn-group__button" href="/cart" iconName="button_cart"/>
          <ButtonLink className="btn-group__button" href="/cart" iconName="button_save"/>
          <ButtonLink className="btn-group__button" href="/user" iconName="button_user"/>
        </div>
      }
      <Search type="medium" className="search" />
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

  .button, .btn-group {
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

`;
export default Header;
