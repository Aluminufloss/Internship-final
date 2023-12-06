import styled from "styled-components";


type ButtonIconProps = {
  path?: string;
};


const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
  return (
    <>
    <input 
      type="file"
      id="image-picker"
      name="image-picker"
      accept="image/png, image/jpeg"
    />
    <StyledButtonIcon htmlFor="image-picker"></StyledButtonIcon>
    </>
  );
};

const StyledButtonIcon = styled.label`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-image: url('images/icons/Photo.png');
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1) translateY(2px);
  }
`;

export default ButtonIcon;
