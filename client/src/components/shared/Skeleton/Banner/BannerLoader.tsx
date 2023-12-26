import React from "react";
import styled from "styled-components";

type BannerLoaderProps = {};

const BannerLoader: React.FC<BannerLoaderProps> = (props) => {
  return <StyledBannerLoader />;
};

const StyledBannerLoader = styled.div`
  width: 100%;
  height: 524px;
  transition: all 0.3s ease;

  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;

export default BannerLoader;
