import React, { VFC } from "react";
import styled from "styled-components";

export const AddButton: VFC = () => {
  return <SButton type="submit">追加</SButton>;
};

export const SButton = styled.button`
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  padding: 5px;
  /* padding: 5px 5px 5px 20px; */
  /* position: relative;
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 5px;
    content: "";
    width: 10px;
    height: 1px;
    background-color: #fff;
  }
  &::after {
    transform: rotate(90deg);
  } */
`;
