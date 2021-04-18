import React, { useCallback, useEffect, VFC } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import TodoButton from "../atoms/button/TodoButton";

const now = new Date();
const nowDate = [
  now.getFullYear(),
  ("0" + (now.getMonth() + 1)).slice(-2),
  ("0" + now.getDate()).slice(-2),
].join("-");

type Props = {
  id: string | undefined;
  date: string;
  name: string;
};

export const TodoItem: VFC<Props> = React.memo(({ id, name, date }) => {
  const d1 =
    (new Date(date).getTime() + 60 * 60 * 9 * 1000) / (60 * 60 * 24 * 1000);
  const d2 = (now.getTime() + 60 * 60 * 9 * 1000) / (60 * 60 * 24 * 1000);
  const timeGapInt = Math.floor(d2 - d1).toString();

  const onClickRecord = useCallback(async (id) => {
    await db
      .collection("todos")
      .doc(id)
      .update({
        date: nowDate,
      })
      .then(() => {
        console.log("update date !");
      });
  }, []);

  const onClickDelete = useCallback(async (id) => {
    const confirmResult: boolean = confirm("本当に削除しますか？");
    if (confirmResult) {
      await db
        .collection("todos")
        .doc(id)
        .delete()
        .then(() => {
          console.log("delete!");
        });
    } else {
      return false;
    }
  }, []);

  useEffect(() => {
    console.log("itemです！");
  });

  return (
    <SItem>
      <SName>{name}</SName>
      <SDate>{date}</SDate>
      <SSince>{timeGapInt}日</SSince>
      <TodoButton className="record_today" onClick={() => onClickRecord(id)}>
        今日やった
      </TodoButton>
      <TodoButton className="delete" onClick={() => onClickDelete(id)}>
        削除する
      </TodoButton>
    </SItem>
  );
});

const SItem = styled.li`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  align-items: start;
  padding: 10px 0;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const SName = styled.p`
  min-width: 200px;
  padding: 10px;
  word-break: break-all;
`;

const SDate = styled.p`
  padding: 10px;
  min-width: 150px;
`;

const SSince = styled.p`
  padding: 10px;
`;
