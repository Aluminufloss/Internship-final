import React from "react";
import styled from "styled-components";

type LayoutProps = {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <StyledLayout>
        { props.children }
    </StyledLayout>
  )
};

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Layout;
