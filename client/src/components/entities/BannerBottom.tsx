import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Text from "../shared/Text";
import Button from "../shared/Button";

type BannerProps = {
  bannerTitle: string;
  bannerSubtitle: string;
  buttonText: string;
};

const BannerBottom: React.FC<BannerProps> = (props) => {
  return (
    <StyledBanner>
      <Image
        src="/images/background/banner_art.png"
        width={246}
        height={391}
        alt="Books"
        className="image__art"
      />
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
      >
        {props.buttonText}
      </Button>
      <Image
        src="/images/background/banner_castle.png"
        width={282}
        height={250}
        alt="Girl's reading a book"
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow: hidden;

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
`;

export default BannerBottom;
