import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/const/colors";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  type?: "text" | "password" | "email";
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputItemAuth: React.VFC<Props> = React.memo(
  ({ labelName, type = "text", onChange, ...inputProps }) => {
    return (
      <SLabel>
        <SLabelName>{labelName}</SLabelName>
        <SInput
          type={type}
          onChange={onChange}
          autoComplete="off"
          {...inputProps}
        />
      </SLabel>
    );
  }
);

const SInput = styled.input`
  border: 1px solid #ccc;
  background-color: ${colors.white01};
  padding: 5px;
  width: 100%;
  border-radius: 10px;
`;

const SLabelName = styled.span`
  font-size: 14px;
  & + ${SInput} {
    margin-top: 10px;
  }
`;

const SLabel = styled.label``;
