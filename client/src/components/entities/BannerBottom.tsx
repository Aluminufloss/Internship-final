import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

import Text from "../shared/Text";
import Button from "../shared/Button";
import media from "@/utils/helper/helper";

type BannerProps = {
  bannerTitle: string;
  bannerSubtitle: string;
  buttonText: string;
};

const BannerBottom: React.FC<BannerProps> = (props) => {
  const router = useRouter();

  function handleClick() {
    router.push("/login");
  }

  return (
    <StyledBanner>
      <Image
        src="/images/background/banner_art.png"
        width={246}
        height={391}
        alt="Books"
        unoptimized={true}
        className="image__art"
      />
      <div className="wrapper">
        <Text fontWeight="bold" fontSize="mediumBig" className="title">
          {props.bannerTitle}
        </Text>
        <Text className="subtitle">{props.bannerSubtitle}</Text>
        <Button
          width="200"
          height="38"
          color="white"
          type="primary"
          fontSize="small"
          className="button"
          onClick={handleClick}
        >
          {props.buttonText}
        </Button>
      </div>
      <Image
        src="/images/background/banner_castle.png"
        width={282}
        height={250}
        alt="Girl's reading a book"
        unoptimized={true}
        className="image"
      />
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  width: 100%;
  height: 505px;
  border-radius: 16px;
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.light};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
  }

  .image {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    &__art {
      position: absolute;
      top: -6px;
      right: -8px;
      z-index: 0;
    }
  }

  .button {
    position: relative;
    z-index: 100;
  }

  .title,
  .subtitle {
    margin-bottom: 20px;
  }

  ${media.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    height: 400px;
    margin-bottom: 100px;

    .image {
      width: 369px;
      height: 345px;
      left: 0;
      bottom: 0;
      transform: none;

      &__art {
        width: 250px;
        top: auto;
        bottom: -100px;
        right: 20px;
      }
    }
  }
`;

export default BannerBottom;
