import React from "react";
import styled from "styled-components";
const Title = styled.h1`
  background: -webkit-linear-gradient(45deg, #f27a54 0%, #a154f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default ({ children }) => {
  return <Title>{children}</Title>;
};
