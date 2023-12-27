import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type LogoProps = {
  type: "smallWhite" | "largeWhite" | "smallBlack" | "largeBlack";
  className?: string;
}

enum IMAGE_TYPE {
  "smallWhite" = "images/logo/logo-small-white.png",
  "largeWhite" = "images/logo/logo-white.png",
  "smallBlack" = "images/logo/logo-small.png",
  "largeBlack" = "images/logo/logo.png",
}

const Logo: React.FC<LogoProps> = (props) => {
  const image = IMAGE_TYPE[props.type]
  const router = useRouter();
  console.log("Ebbaaa", IMAGE_TYPE[props.type])

  function handleClick() {
    router.push('/catalog');
  }

  return (
    <StyledLogo 
      src={IMAGE_TYPE[props.type]}
      onError={(e) => {
        (e.target as HTMLImageElement).onerror = null;
        (e.target as HTMLImageElement).src = IMAGE_TYPE.smallWhite;
      }}
      width={1}
      height={1}
      alt="Logo image"
      unoptimized={true}
      className={props.className}
    />

    // <StyledLogo 
    //   type={props.type} 
    //   onClick={handleClick} 
    //   className={props.className}
    // />
  );
};

const StyledLogo = styled(Image)<LogoProps>`
  background-repeat: no-repeat;
  background-size: cover;
`
export default Logo;