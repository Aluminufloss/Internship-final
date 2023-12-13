import React from "react";
import styled from "styled-components";
import Image from "next/image";

import ButtonIcon from "./ButtonIcon";

import { DEFAULT_IMAGE } from "@/utils/constant/constant";

type AvatarProps = {
  avatar: string;
  uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <StyledAvatar>
      <Image
        src={props.avatar}
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = DEFAULT_IMAGE.default;
        }}
        width={154}
        height={154}
        alt="Your image"
        className="image"
      />
      <ButtonIcon uploadPhoto={props.uploadPhoto} />
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

  .image {
    width: 100%;
    height: 100%;
  }
`;

export default Avatar;
