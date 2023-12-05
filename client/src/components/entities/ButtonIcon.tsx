import styled from "styled-components";


type ButtonIcon = {
  path?: string;
};

const ButtonIcon = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-image: url('images/icons/Photo.png');
  transition: all .3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1) translateY(2px);
  }
`;

export default ButtonIcon;
