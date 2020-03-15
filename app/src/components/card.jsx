import React from "react";
import styled from "styled-components";
const Card = styled.div`
  background: ${props =>
    props.normal
      ? "linear-gradient(90deg, #f27a54 0%, #a154f2 100%)"
      : "#3c444d"};
  border-radius: 4px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  padding: 20px;
  text-align: center;
  min-width: 80vw;
  margin: 10px 0;
  -webkit-transition: all 1000ms linear;
  -ms-transition: all 1000ms linear;
  transition: all 1000ms linear;
`;
export default ({ children, normal }) => {
  return <Card normal={normal}>{children}</Card>;
};
