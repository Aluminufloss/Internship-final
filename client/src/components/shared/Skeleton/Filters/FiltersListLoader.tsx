import React from "react";
import styled from "styled-components";
import FilterLoader from "./FilterLoader";

const FilterListLoader = () => {
  return (
    <StyledFilterListLoader>
      <FilterLoader />
      <FilterLoader />
      <FilterLoader />
    </StyledFilterListLoader>
  );
};

const StyledFilterListLoader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.3s ease;
`;

export default FilterListLoader;
