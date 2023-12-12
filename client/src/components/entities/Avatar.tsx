import React from "react";
import styled from "styled-components";
import Image from "next/image";
import ButtonIcon from "./ButtonIcon";
import { encodeImageFileAsURL } from "@/utils/helper/helper";

type AvatarProps = {
  avatar: File;
  uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userID: string;
};

// const photo = props.avatar ? URL.createObjectURL(props.avatar) : "/images/user/user-empthy.png"
// // console.log("Photo", photo);

// if (typeof props.avatar !== 'string' && props.avatar !== undefined) {
//   const sussyRes = encodeImageFileAsURL(props.avatar!);
//   console.log("Yep", sussyRes);
// }

const Avatar: React.FC<AvatarProps> = (props) => {
  const photo = "";

  return (
    <StyledAvatar>
    <Image
        src={photo}
        width={154}
        height={154}
        alt="Girl's reading a book"
        className="image"
    />
      <ButtonIcon uploadPhoto={props.uploadPhoto}/>
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
