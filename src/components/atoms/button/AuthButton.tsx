import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles/const/colors";
import { mediaQuery } from "../../../styles/const/size";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps;

export const AuthButton: React.VFC<Props> = React.memo(({ ...inputProps }) => {
  return <SButton type="submit" {...inputProps} />;
});

const SButton = styled.input`
  &[type="submit"] {
    background-color: ${colors.blue01};
    color: ${colors.white01};
    border-radius: 10px;
    padding: 10px 20px;
    font-weight: bold;
    font-size: 14px;
    outline: none;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
    ${mediaQuery.md} {
      font-size: 16px;
    }
    &:hover {
      background-color: ${colors.blue01Active};
    }
  }
`;

export default AuthButton;
