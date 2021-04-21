import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../../styles/const/colors";
import { mediaQuery } from "../../styles/const/size";

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const InputListAuth: React.VFC<Props> = React.memo(
  ({ children, onSubmit }) => {
    return (
      <SFormBox className="auth_formBox">
        <SForm className="auth_form" onSubmit={onSubmit}>
          {children}
        </SForm>
      </SFormBox>
    );
  }
);
const SFormBox = styled.div`
  border: 1px solid #ccc;
  background-color: ${colors.white01};
  width: 100%;
  max-width: 90%;
  margin: auto;
  padding: 20px;
  display: grid;
  border-radius: 10px;
  ${mediaQuery.md} {
    max-width: 500px;
    padding: 30px;
  }
`;

const SForm = styled.form`
  display: grid;
  grid-gap: 20px;
`;
