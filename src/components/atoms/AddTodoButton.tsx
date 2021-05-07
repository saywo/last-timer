import React, { VFC, memo } from "react";
import styled from "styled-components";
import { colors } from "../../styles/index";

export const AddTodoButton: VFC = memo(() => {
  return <SButton type="submit">追加</SButton>;
});

export const SButton = styled.button`
  background-color: ${colors.blue01};
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${colors.blue01Active};
  }
`;
