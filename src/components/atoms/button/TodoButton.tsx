import React, { ReactNode } from "react";
import styled from "styled-components";

type ButtonProps = Omit<JSX.IntrinsicElements["button"], "ref">;
type Props = ButtonProps & {
  children: ReactNode;
};

export const TodoButton: React.VFC<Props> = ({ children, ...buttonProps }) => {
  return <SButton {...buttonProps}>{children}</SButton>;
};

const SButton = styled.button`
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  &.record_today {
    background-color: #fff;
    border: 1px solid #d8d8d8;
  }
  &.delete {
    background-color: #ca6060;
    border: 1px solid #ca6060;
    color: #fff;
  }
  &:hover {
    &.record_today {
      background-color: #d8d8d8;
    }
    &.delete {
      background-color: #c90000;
      border-color: #c90000;
    }
  }
`;

export default TodoButton;
