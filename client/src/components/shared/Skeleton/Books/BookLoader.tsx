import React from "react";
import styled from "styled-components";

type BookLoaderProps = {};

const BookLoader: React.FC<BookLoaderProps> = (props) => {
  return (
    <StyledBookLoader>
      <div className="skeleton--image" />
      <div className="skeleton--title" />
      <div className="skeleton--author" />
      <div className="skeleton--rating" />
      <div className="skeleton--button" />
    </StyledBookLoader>
  );
};

const StyledBookLoader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s ease;

  .skeleton {
    &--image,
    &--title,
    &--rating,
    &--author,
    &--button {
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      background-size: 200% 100%;
      animation: 1.5s shine linear infinite;
    }

    &--image {
      width: 100%;
      height: 58%;
      margin-bottom: 15px;
      border-radius: 16px;
    }

    &--title {
      width: 100%;
      height: 20px;
      border-radius: 5px;
      margin-bottom: 6px;
    }

    &--author {
      width: 75%;
      height: 20px;
      border-radius: 5px;
      margin-bottom: 12px;
      align-self: flex-start;
    }

    &--rating {
      width: 100%;
      height: 20px;
      border-radius: 5px;
      margin-bottom: 15px;
    }

    &--button {
      width: 90%;
      height: 34px;
      border-radius: 16px;
    }

    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  }
`;

export default BookLoader;
