import React from "react";
import styled, { css } from "styled-components";
const BotonStyled = css`
  text-decoration: transparent;
  width: 100%;
  margin: auto;
  text-rendering: auto;
  color: #ffffff;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: transparent;
  box-sizing: border-box;
  font-family: Montserrat;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 20px;
  font-family: Zilla Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 33px;
  text-align: center;
  transition: all 1s;
  &:focus {
    background: #ffffff4d;
    outline: none;
  }
  &:hover {
    background: #ffffff23;
    outline: none;
  }
`;

const Boton = styled.button`
  ${BotonStyled}
`;
const BotonAnchor = styled.a`
  ${BotonStyled}
`;

export default ({ children, href, newtab, button, onClick }) => {
  if (button && onClick) return <Boton onClick={onClick}>{children}</Boton>;
  return (
    <BotonAnchor href={href} target={newtab ? "_blank" : "_self"}>
      {children}
    </BotonAnchor>
  );
};
