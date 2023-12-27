import React from "react";
import styled, { css } from "styled-components";

import Text from "../shared/Text";
import GenreFilter from "../entities/GenreFilter";
import MoneyFilter from "../entities/MoneyFilter";
import CustomFilter from "../entities/CustomFilter";

type FilterProps = {};

const Filtres: React.FC<FilterProps> = (props) => {
  return (
    <StyledFiltersContainer className="filter__group">
      <Text
        color="dark"
        fontWeight="bold"
        fontSize="mediumBig"
        className="filter__text"
      >
        Catalog
      </Text>
      <StyledFilters className="filter__group">
        <GenreFilter className="filter"/>
        {/* <MoneyFilter /> */}
        <CustomFilter className="filter"/>
      </StyledFilters>
    </StyledFiltersContainer>
  );
};

const StyledFiltersContainer = styled.div`
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

  @media (min-width: 720px) {
    .filter__text {
      font-size: ${(props) => props.theme.fontSizes.bigLarge};
      margin-bottom: 20px;
      margin-top: 60px;
    }
  }
`;

const StyledFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .filter {
    margin-bottom: 20px;
  }

  .filter__select--container {
    position: relative;
    width: 100%;
    height: 48px;
    margin-bottom: 20px;
  }

  .filter__text {
    align-self: flex-start;
  }

  & select {
    margin-bottom: 20px;
  }

  @media (min-width: 720px) {
    flex-direction: row;
    gap: 20px;
    margin-bottom: 50px;

    .filter__text {
      font-size: ${(props) => props.theme.fontSizes.bigLarge};
      margin-bottom: 20px;
    }
  }
`;

export default Filtres;
