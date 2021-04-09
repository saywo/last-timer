import React from "react";
import styled from "styled-components";

type Props = {
  children: string;
  onClick: () => void;
};

export const PrimaryButton: React.VFC<Props> = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled.button`
  background-color: red;
  border: 1px solid red;
  color: #fff;
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  &:hover {
    background-color: #fff;
    color: red;
    border-color: red;
  }
`;
