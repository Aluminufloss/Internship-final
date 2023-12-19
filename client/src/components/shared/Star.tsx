import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

type StarProps = {
  flag: string;
  number?: number;
  onClick?: (number: number) => void;
};

const Star: React.FC<StarProps> = (props) => {
  const [isHover, setIsHover] = useState("empty");

  function hanldeClick () {
    if (typeof props.number === 'undefined') {
      return;
    } else {
      if (typeof props.onClick !== 'undefined') {
        props.onClick(props.number);
      }
    }
  }

  return (
      <StyledStar 
        flag={props.flag}
        number={props.number}
        width={15}
        height={15}
        onClick={hanldeClick}
        onMouseEnter={ev => setIsHover("full")}
        onMouseLeave={ev => setIsHover("empty")}
        src={
          isHover === "full" || props.flag === "full"
            ? "/images/stars/star-fill.png"
            : "/images/stars/star.png"
        }
        alt="star"
      />
  );
};

const StyledStar = styled(Image)<StarProps>`
`;

export default Star;
