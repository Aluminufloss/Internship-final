import React from "react";
import styled, { css } from "styled-components";

import Text from "../shared/Text";
import GenreFilter from "../entities/GenreFilter";
import MoneyFilter from "../entities/MoneyFilter";
import CustomFilter from "../entities/CustomFilter";

type FilterProps = {};

const SIZE = {
  small: css`
    height: 47px;
  `,
  medium: css`
    height: 64px;
  `,

  large: css`
    height: 64px;
  `,
};

const Filtres: React.FC<FilterProps> = (props) => {
  return (
    <>
      <StyledFilters className="filter__group">
      <Text
        color="dark"
        fontWeight="bold"
        fontSize="mediumBig"
        className="filter__text"
      >
        Catalog
      </Text>
      <GenreFilter />
      {/* <MoneyFilter /> */}
      <CustomFilter />
      </StyledFilters>
    </>
  );
};

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  .filter {
    &__text {
      margin-bottom: 13px;
    }
  }

  select {
    height: 48px;
    position: relative;
    width: 100%;
    padding: 10px 0 10px 15px;
    background-color: ${(props) => props.theme.colors.light};
    border-radius: 16px;
    border: none;
    appearance: none;
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: ${(props) => props.theme.colors.smallBig};
    font-weight: 500;
  }

  .filter__select--container {
      position: relative;
      width: 100%;
      height: 48px;
      margin-bottom: 20px;
    }

    .filter__select--icon {
      position: absolute;
      top: 12px;
      right: 8px;
      width: 24px;
      height: 24px;
      background: transparent;
      background-image: url("/images/icons/Select.svg");
      background-repeat: no-repeat;
    }
    
    .filter__text {
      align-self: flex-start;
    }
`;

export default Filtres;
