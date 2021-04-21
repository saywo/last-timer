import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/const/colors";

type InputProps = Omit<JSX.IntrinsicElements["input"], "ref">;
type Props = InputProps & {
  labelName: string;
};

export const AddInput: React.VFC<Props> = React.memo(
  ({ labelName, ...inputProps }) => {
    return (
      <SLabel>
        <SLabelName>{labelName}</SLabelName>
        <SInput className="SInput" {...inputProps} />
      </SLabel>
    );
  }
);

const SLabelName = styled.span`
  font-weight: bold;
  white-space: nowrap;
  & + .SInput {
    margin-left: 8px;
  }
`;

const SInput = styled.input`
  background-color: ${colors.white01};
  border-radius: 10px;
  padding: 5px 10px;
  min-height: 36px;
  width: 100%;
`;

const SLabel = styled.label`
  display: flex;
  align-items: center;
`;
