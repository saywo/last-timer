import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  // buttonType: "transparent" | "white";
  onClick?: () => void;
};

const HeaderButton: React.VFC<Props> = ({
  children,
  // buttonType = "transparent",
  onClick,
}) => {
  return <SButton onClick={onClick}>{children}</SButton>;
};

const SButton = styled.button`
  border: 1px solid #e9e9e9;
  color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: #e9e9e9;
    color: #333;
  }
`;

export default HeaderButton;
