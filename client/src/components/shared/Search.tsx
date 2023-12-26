import React from "react";
import styled, { css } from "styled-components";

type SearchProps = {
  className?: string;
  type: "small" | "medium" | "large";
  handleSearch?: (value: string) => void
};

const TYPE = {
  small: css`
    height: 64px;
  `,
  medium: css`
    height: 47px;
  `,

  large: css`
    height: 64px;
  `,
};

const Search: React.FC<SearchProps> = (props) => {
  return (
    <StyledSearch type={props.type ?? "medium"} className={props.className}>
      <input
        type="Search"
        placeholder="Search"
        onChange={(ev) => props.handleSearch?.(ev.target.value)}
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.form<SearchProps>`
  ${(props) => props.type && TYPE[props.type]}

  & input {
    background-color: ${(props) => props.theme.colors.light};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.darkGrey};
    ${(props) => props.type && TYPE[props.type]};
    width: 100%;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 64px;
    padding-right: 24px;
    background-image: url("images/icons/Search.svg");
    background-repeat: no-repeat;
    background-position: 24px center;
  }
`;

export default Search;
