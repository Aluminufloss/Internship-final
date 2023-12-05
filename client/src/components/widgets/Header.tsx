import Text from "@/components/shared/Text";
import React from "react";
import styled from "styled-components";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import Search from "../shared/Search";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <StyledHeader>
      <Logo type="smallWhite" className="logo" />
      <Text fontSize="smallBig" className="text">
        Catalog
      </Text>
      <Button
        width="135"
        height="38"
        type="primary"
        className="button"
        fontSize="small"
      >
        Log In/ Sing Up
      </Button>
      <Search type="medium" />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 115px;
  margin: 20px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export default Header;
