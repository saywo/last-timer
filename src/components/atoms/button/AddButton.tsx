import React, { VFC } from "react";
import styled from "styled-components";

export const AddButton: VFC = () => {
  return <SButton type="submit">追加</SButton>;
};

export const SButton = styled.button`
  background-color: #60caad;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #0fc190;
  }
`;
