import styled from "styled-components";
import Image from "next/image";

import Text from "../shared/Text";

type EmptyCartProps = {
  title: string;
  text: string;
};

const EmptyFilter: React.FC<EmptyCartProps> = (props) => {
  return (
    <StyledEmptyCart title={props.title} text={props.text}>
      <Text 
        fontSize="medium" 
        fontWeight="bold" 
        color="dark" 
        className="title"
      >
        {props.title}
      </Text>
      <Text
        className="subtitle"
        fontSize="small"
        fontWeight="medium"
        color="darkBlue"
      >
        {props.text}
      </Text>
      <Image 
        className="image"
        src={"/images/background/empty_cart_books.png"}
        width={290}
        height={176}
        alt="Go buy some books"
      />
    </StyledEmptyCart>
  );
};

const StyledEmptyCart = styled.div<EmptyCartProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .title {
    margin-bottom: 15px;
  }

  .subtitle {
    margin-bottom: 30px;
  }

  .button  {
    width: 100%;
    margin-bottom: 40px;
  }

  .image {
    align-self: center;
    margin-bottom: 6px;
  }
`;

export default EmptyFilter;