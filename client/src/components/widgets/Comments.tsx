import { IComment } from "@/models/response/Comment/IComment";
import React from "react";
import styled from "styled-components";
import Comment from "../features/Comment";

type CommentsProps = {
  comments: IComment[],
};

const Comments: React.FC<CommentsProps> = (props) => {
  return (
    <StyledComments comments={props.comments}>
      {props.comments.map((comment) => <Comment comment={comment}/>)}
    </StyledComments>
  );
};

const StyledComments = styled.div<CommentsProps>`
  width: 100%;

`;

export default Comments;
