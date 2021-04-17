import React, { memo } from "react";
import styled from "styled-components";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  labelName: string;
};

export const AddInput: React.VFC<Props> = memo(
  ({ labelName, ...inputProps }) => {
    return (
      <label>
        <SLabelName>{labelName}</SLabelName>
        <SInput {...inputProps} />
      </label>
    );
  }
);

const SLabelName = styled.span`
  font-weight: bold;
  & + * {
    margin-left: 5px;
  }
`;

const SInput = styled.input`
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px;
`;
