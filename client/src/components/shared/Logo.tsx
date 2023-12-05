import styled, { css } from 'styled-components';

type LogoProps = {
  type: "smallWhite" | "largeWhite" | "smallBlack" | "largeBlack";
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

const Logo = styled.div<LogoProps>`
  ${(props) => props.type && TYPE[props.type]}
  background-repeat: no-repeat;
  background-size: cover;
`
export default Logo;