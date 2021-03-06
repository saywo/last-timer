import React, { VFC, ReactNode, memo } from "react";
import styled from "styled-components";
import { colors } from "../../styles/const/colors";

type Props = {
  children: ReactNode;
};

export const BlackBg: VFC<Props> = memo(({ children }) => {
  return <SWrap>{children}</SWrap>;
});

const SWrap = styled.div`
  display: flex;
  flex: 1 1;
  background-color: ${colors.black01};
`;
