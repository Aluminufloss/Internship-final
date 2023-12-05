import React from "react";
import styled from "styled-components";
import Image from "next/image";
import ButtonIcon from "./ButtonIcon";

type AvatarProps = {};

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <StyledAvatar>
    <Image
        src="/images/user/user-empthy.png"
        width={154}
        height={154}
        alt="Girl's reading a book"
        className="image"
      />
      <ButtonIcon />
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div`
  width: 290px;
  height: 290px;
  border-radius: 16px;
  margin-bottom: 30px;
  background-color: ${props => props.theme.colors.light};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Avatar;
