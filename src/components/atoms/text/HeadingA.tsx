import React, { ReactNode, VFC, memo } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const HeadingA: VFC<Props> = memo(({ children }) => {
  return <SHeading>{children}</SHeading>;
});

const SHeading = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;
