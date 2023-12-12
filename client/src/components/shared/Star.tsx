import React from "react";
import styled from "styled-components";

const Star = () => {
  return (
    <StyledStar>
      
    </StyledStar>
  )
};

const StyledStar = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("/images/icons/Star-fill.svg");
`;

export default Star;
