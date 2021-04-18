import React, { memo, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const InputListAuth: React.VFC<Props> = memo(({ children }) => {
  return (
    <SFormArea>
      <ul>{children}</ul>
    </SFormArea>
  );
});
const SFormArea = styled.div`
  border: 1px solid #ccc;
  width: 500px;
  margin: auto;
  padding: 30px;
  display: grid;
  border-radius: 10px;
`;
