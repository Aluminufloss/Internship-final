import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Text from "../shared/Text";
import Button from "../shared/Button";
import media from "@/utils/helper/helper";

type BannerProps = {
  bannerTitle: string;
  bannerSubtitle: string;
  buttonText: string;
};

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <StyledBanner>
      <Image
        src="/images/background/banner_books.png"
        width={232}
        height={140}
        alt="Books"
        className="image__books"
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
        src="/images/humans/human2-small.png"
        width={253}
        height={282}
        alt="Girl's reading a book"
        className="image"
        unoptimized={true}
      />
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  width: 100%;
  height: 505px;
  border-radius: 16px;
  padding: 20px 20px 0 20px;
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

    &__books {
      position: absolute;
      top: 17px;
      right: -10px;
      z-index: 0;
    }
  }

  .title,
  .subtitle {
    margin-bottom: 20px;
  }

  .button {
    position: relative;
    z-index: 100;
  }

  ${media.tablet} {
    height: 289px;
    overflow: visible;
    align-items: flex-start;
    padding-top: 45px;
    padding-left: 40px;

    .image {
      height: 364px;
      width: 328px;
      right: 14px;
      bottom: 0;
      left: auto;
      transform: none;

      &__books {
        width: 361px;
        height: 218px;
        top: auto;
        left: 0;
        bottom: 0;
      }
    }

    .title {
      font-size: ${props => `${props.theme.fontSizes.bigLarge}`};
    }

    .subtitle {
      font-size: ${props => `${props.theme.fontSizes.medium}`};
      color: ${props => `${props.theme.colors.darkBlue}`};
    }

    .button {
      width: 230px;
      height: 44px;

    }
  }

  ${media.extraDesktop} {
    height: 400px;
    padding-left: 68px;

    .image {
      height: 400px;
      width: 406px;
      right: 0;
    }

    .title {
      font-size: ${props => `${props.theme.fontSizes.large}`};
    }

    .subtitle {
      font-size: ${props => `${props.theme.fontSizes.big}`};
      margin-bottom: 50px;
    }

    .button {
      font-size: ${props => `${props.theme.fontSizes.medium}`};
    }
  }
`;

export default Banner;
