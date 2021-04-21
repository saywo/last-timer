import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../../styles/const/colors";

type ButtonProps = Omit<JSX.IntrinsicElements["button"], "ref">;
type Props = ButtonProps & {
  children: ReactNode;
};

export const TodoButton: React.VFC<Props> = React.memo(
  ({ children, ...buttonProps }) => {
    return <SButton {...buttonProps}>{children}</SButton>;
  }
);

const SButton = styled.button`
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  &.record_today {
    background-color: #fff;
    border: 1px solid ${colors.gray01};
  }
  &.delete {
    background-color: ${colors.red01};
    border: 1px solid ${colors.red01};
    color: #fff;
  }
  &:hover {
    &.record_today {
      background-color: ${colors.gray01};
    }
    &.delete {
      background-color: ${colors.red01Active};
      border-color: ${colors.red01Active};
    }
  }
`;
