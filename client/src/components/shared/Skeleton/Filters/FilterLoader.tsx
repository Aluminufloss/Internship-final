import React from "react";
import styled from "styled-components";

const FilterLoader = () => {
  return (
    <StyledFilterLoader />
  );
};

const StyledFilterLoader = styled.div`
  width: 100%;
  height: 48px;
  margin-bottom: 20px;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  border-radius: 16px;
  animation: 1.5s shine linear infinite;
  transition: all 0.3s ease;

  @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
`;

export default FilterLoader;
