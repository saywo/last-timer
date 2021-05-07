import React, { VFC, ReactNode } from "react";
import styled from "styled-components";
import { colors, mediaQuery } from "../../styles/index";

type InputProps = Omit<JSX.IntrinsicElements["button"], "ref">;
type Props = InputProps & {
  buttonType?: "default" | "cv";
  children: ReactNode;
};

export const HeaderButton: VFC<Props> = ({
  buttonType = "default",
  children,
  ...inputProps
}) => {
  return (
    <SButton className={buttonType} {...inputProps}>
      {children}
    </SButton>
  );
};

const SButton = styled.button`
  border-radius: 10px;
  padding: calc((10em / 14)) calc((20em / 14));
  font-size: 14px;
  font-weight: bold;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
  ${mediaQuery.md} {
    font-size: 16px;
  }
  &.default {
    border: 1px solid ${colors.gray02};
    color: ${colors.white01};
    &:hover {
      background-color: ${colors.gray02};
      color: ${colors.black01};
    }
  }
  &.cv {
    background-color: ${colors.blue01};
    border: 1px solid ${colors.blue01};
    color: ${colors.white01};
    &:hover {
      background-color: ${colors.blue01Active};
    }
  }
`;
