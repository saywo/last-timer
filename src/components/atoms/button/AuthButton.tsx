import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const AuthButton: React.VFC<Props> = ({ children, onClick }) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled.button`
  background-color: #d8d8d8;
  color: #333;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default AuthButton;
