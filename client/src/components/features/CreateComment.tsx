import React from "react";
import styled from "styled-components";
import { Formik } from "formik";

import Button from "../shared/Button";
import AuthService from "@/services/AuthService";

type CreateCommentProps = {
  bookID: string;
  accessToken: string;
};

const CreateComment: React.FC<CreateCommentProps> = (props) => {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        if (!values.text) {
          return;
        }

        await AuthService.createComment(props.bookID, values.text, props.accessToken);
      }}
    >
      {(formik) => (
        <StyledForm
          onSubmit={formik.handleSubmit}
          bookID={props.bookID}
          accessToken={props.accessToken}
        >
          <StyledCreateComment
            name="text"
            placeholder="Share a comment"
            value={formik.values.text}
            onChange={formik.handleChange}
            maxLength={360}
          />
          <Button
            type="primary"
            width="210"
            height="38"
            className="button__post-comment"
          >
            Post a comment
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

const StyledForm = styled.form<CreateCommentProps>`
  width: 100%;

  .button__post-comment {
    margin-bottom: 60px;
  }
`;

const StyledCreateComment = styled.textarea`
  width: 100%;
  min-height: 87px;
  padding: 20px 24px;
  border-radius: 16px;
  margin-bottom: 30px;
  background-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.darkBlue};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.medium};

  &:placeholder-shown {
    color: ${(props) => props.theme.colors.darkGrey};
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.normal};
  }
`;

export default CreateComment;
