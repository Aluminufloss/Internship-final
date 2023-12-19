import React from "react";
import styled from "styled-components";

import { IComment } from "@/models/response/Comment/IComment";
import Image from "next/image";
import Text from "../shared/Text";
import { DEFAULT_IMAGE } from "@/utils/constant/constant";

type CommentProps = {
  className?: string;
  comment: IComment;
};

const Comment: React.FC<CommentProps> = (props) => {
  return (
    <StyledComment className={props.className} comment={props.comment}>
      <div className="user">
        <Image
          className="user__avatar"
          src={props.comment.imagePath}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE.default;
          }}
          width={35}
          height={35}
          alt="Your image"
          unoptimized={true}
        />
        <div className="user__info">
          <Text
            className="user__info--name"
            fontSize="small"
            fontWeight="semiBold"
            color="dark"
          >
            {props.comment.username}
          </Text>
          <Text
            className="user__info-comment--date"
            fontSize="small"
            color="darkGrey"
          >
            {props.comment.date}
          </Text>
        </div>
      </div>

      <Text className="comment__text" fontSize="small" fontWeight="medium" color="darkBlue" >{props.comment.commentText}</Text>
    </StyledComment>
  );
};

//font-size: ${(props) => props.theme.fontSizes.small};
//font-weight: ${(props) => props.theme.fontWeights.medium};
//color: ${(props) => props.theme.colors.darkBlue};
const StyledComment = styled.div<CommentProps>`
  width: 100%;
  padding: 13px 10px 10px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.light};
  margin-bottom: 10px;

  .user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    &__avatar {
      border-radius: 100px;
      margin-right: 13px;
    }

    &__info {
      &--comment-date {
      }

      &--name {
      }
    }
  }
`;

export default Comment;
