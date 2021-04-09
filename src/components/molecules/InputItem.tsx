import React from "react";
import styled from "styled-components";

type Props = {
  label: string;
  id: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputItem: React.VFC<Props> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <SFormList>
      <dt>
        <SLabel htmlFor={id}>{label}</SLabel>
      </dt>
      <dd>
        <SInput type={type} id={id} value={value} onChange={onChange} />
      </dd>
    </SFormList>
  );
};
const SFormList = styled.dl`
  /* display: flex; */
  & + & {
    margin-top: 20px;
  }
  dt {
    min-width: 120px;
  }
  dd {
    flex: 1;
  }
  dt + dd {
    margin-top: 10px;
  }
`;
const SLabel = styled.label``;
const SInput = styled.input`
  border: 1px solid #ccc;
  width: 100%;
`;
