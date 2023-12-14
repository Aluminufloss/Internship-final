import React from "react";
import styled, { css } from "styled-components";

import Text from "../shared/Text";
import Image from "next/image";

type BookDetailsProps = {};

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  return (
    <StyledBookDetails>
      {/* <Image className="book__image" width={135} height={202} /> */}
      <Text className="book__title">Title</Text>
      <Text className="book__author"></Text>
    </StyledBookDetails>
  );
};

const StyledBookDetails = styled.div<BookDetailsProps>`
  
`;

export default BookDetails;
