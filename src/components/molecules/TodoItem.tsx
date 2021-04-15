import React, { VFC } from "react";
import styled from "styled-components";

type Props = {
  id: string | undefined;
  date: string | undefined;
  name: string | undefined;
  onClickRecord: any;
  onClickDelete: any;
  onChangeUpdateDate: any;
};

export const TodoItem: VFC<Props> = ({
  id,
  name,
  date,
  onClickRecord,
  onClickDelete,
  onChangeUpdateDate,
}) => {
  return (
    <SItem>
      <SName>{name}</SName>
      <SDate
        type="date"
        onChange={() => onChangeUpdateDate(id)}
        value={date}
        defaultValue={date}
      ></SDate>
      <SRecord onClick={() => onClickRecord(id)}>今日やった</SRecord>
      <SRecord onClick={() => onClickDelete(id)}>削除する</SRecord>
    </SItem>
  );
};

const SItem = styled.li`
  display: flex;
  & + & {
    margin-top: 10px;
  }
`;

const SName = styled.p`
  min-width: 200px;
  background-color: #efefef;
  padding: 10px;
`;

const SDate = styled.input`
  border: 1px solid #efefef;
`;

const SRecord = styled.button`
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
`;
