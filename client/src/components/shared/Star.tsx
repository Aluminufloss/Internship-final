import Image from "next/image";
import React from "react";
import styled from "styled-components";

type StarProps = {
  flag: string;
};

const Star: React.FC<StarProps> = (props) => {
  return (
      <StyledStar flag={props.flag}
        width={15}
        height={15}
        src={
          props.flag === "full"
            ? "/images/stars/star-fill.png"
            : props.flag === "empty"
              ? "/images/stars/star.png"
              : "/images/stars/star-half.png"
        }
        alt="star"
      />
  );
};

const StyledStar = styled(Image)<StarProps>`
`;

export default Star;
