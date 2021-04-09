import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const InputArea: React.VFC<Props> = ({ children }) => {
  return <SFormArea>{children}</SFormArea>;
};
const SFormArea = styled.div`
  /* display: flex; */
  border: 1px solid #ccc;
  width: 500px;
  margin: auto;
  padding: 30px;
`;
