import React, { memo } from "react";
import styled from "styled-components";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  type?: "text" | "password" | "email";
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputItemAuth: React.VFC<Props> = memo(
  ({ labelName, type = "text", onChange, ...inputProps }) => {
    return (
      <SFormItem>
        <SLabel>
          <SLabelName>{labelName}</SLabelName>
          <SInput type={type} onChange={onChange} {...inputProps} />
        </SLabel>
      </SFormItem>
    );
  }
);

const SInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
`;

const SLabelName = styled.span`
  & + ${SInput} {
    margin-top: 10px;
  }
`;

const SLabel = styled.label``;

const SFormItem = styled.li`
  & + & {
    margin-top: 20px;
  }
`;
