import React, { memo } from "react";
import styled from "styled-components";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  labelName: string;
};

export const AddInput: React.VFC<Props> = memo(
  ({ labelName, ...inputProps }) => {
    return (
      <SLabel>
        <SLabelName>{labelName}</SLabelName>
        <SInput {...inputProps} />
      </SLabel>
    );
  }
);

const SLabelName = styled.span`
  font-weight: bold;
  white-space: nowrap;
  & + * {
    margin-left: 5px;
  }
`;

const SInput = styled.input`
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px 10px;
  min-height: 36px;
  width: 100%;
`;

const SLabel = styled.label`
  display: flex;
  align-items: center;
`;
