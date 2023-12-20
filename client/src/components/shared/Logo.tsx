import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

type LogoProps = {
  type: "smallWhite" | "largeWhite" | "smallBlack" | "largeBlack";
  className?: string;
}

const TYPE = {
  smallBlack: css`
    background-image: url("images/logo/logo-small.png");
    width: 62px;
    height: 31px;
  `,
  largeBlack: css`
    background-image: url("images/logo/logo.png");
    width: 88px;
    height: 46px;
  `,
  smallWhite: css`
    background-image: url("images/logo/logo-small-white.png");
    width: 62px;
    height: 31px;
  `,
  largeWhite: css`
    background-image: url("images/logo/logo-white.png");
    width: 88px;
    height: 46px;
  `,
};

const Logo: React.FC<LogoProps> = (props) => {
  const router = useRouter();

  function handleClick() {
    router.push('/catalog');
  }

  return (
    <StyledLogo 
      type={props.type} 
      onClick={handleClick} 
      className={props.className}
    />
  );
};

const StyledLogo = styled.div<LogoProps>`
  ${(props) => props.type && TYPE[props.type]}
  background-repeat: no-repeat;
  background-size: cover;
`
export default Logo;