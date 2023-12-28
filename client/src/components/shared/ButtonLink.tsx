import { STATIC_PATHS } from "@/utils/constant/constant";
import media from "@/utils/helper/helper";
import Link from "next/link";
import styled from "styled-components";

type ButtonIconProps = {
  href: string;
  iconname: string;
  icon?: string;
  className?: string;
};

const ButtonLink: React.FC<ButtonIconProps> = (props) => {
  const icon = `${STATIC_PATHS.buttons}/${props.iconname}.svg`;

  return (
    <StyledButtonLink
      href={props.href}
      className={props.className}
      iconname={props.iconname}
      icon={icon}
    />
  );
};

const StyledButtonLink = styled(Link)<ButtonIconProps>`
  display: inline-block;
  width: 32px;
  height: 32px;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1) translateY(2px);
  }

  ${media.tablet} {
    width: 48px;
    height: 48px;
  }
`;

export default ButtonLink;
