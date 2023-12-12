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
`;

export default Banner;
