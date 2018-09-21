import * as React from "react";
import styled from "styled-components";

export const white = "#fcfcfc";
export const purple = "#9287ff";
export const black = "#151b26";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;

  display: flex;
`;

export const BigCircle = styled.div`
  border-radius: 50%;
  background: ${purple};

  width: 2000px;
  height: 2000px;
`;

export const Heading = styled.h1`
  font-size: 2.3rem;
  font-weight: normal;
  color: ${white};
`;

export const Content = styled.div`
  margin-left: 3em;
  margin-right: 3em;

  margin-top: 10em;

  display: flex;
  flex-direction: column;
  justify-items: center;
`;

export const DarkHeading = styled(Heading)`
  color: ${black};
`;

interface Props {
  children?: React.ReactNode;
}

export const FullPageError = (props: Props) => (
  <Content>
    <DarkHeading>
      {props.children ? props.children : "Error Occurred! :("}
    </DarkHeading>
  </Content>
);

export const FullPageLoading = () => (
  <Content>
    <DarkHeading>Loading...</DarkHeading>
  </Content>
);
