import styled from "styled-components";

type LabelProps = {
  htmlFor: string;
  className?: string;
  chidlren?: string;
};

const Label = styled.label<LabelProps>`
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.darkBlue};
`;

export default Label;
