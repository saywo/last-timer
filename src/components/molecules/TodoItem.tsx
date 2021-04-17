import React, { useCallback, useEffect, VFC } from "react";
import styled from "styled-components";
import { db } from "../../firebase";

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
  const splitedLastDate = date.split("-");
  const lastYear: number = parseInt(splitedLastDate[0]),
    lastMonth = parseInt(splitedLastDate[1]),
    lastDay = parseInt(splitedLastDate[2]);

  const lastDate = new Date(lastYear, lastMonth, lastDay);
  console.log(lastDate);
  // const gap = (now - lastDate) / (1000 * 60 * 60 * 24);

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
      <SName>
        {id}
        {name}
      </SName>
      <SDate>{date}</SDate>
      {/* <SSince>{lastDate}</SSince> */}
      <SButton className="today" onClick={() => onClickRecord(id)}>
        今日やった
      </SButton>
      <SButton className="delete" onClick={() => onClickDelete(id)}>
        削除する
      </SButton>
    </SItem>
  );
});

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

const SDate = styled.p`
  padding: 10px;
  min-width: 150px;
  text-align: center;
`;

const SSince = styled.p`
  padding: 10px;
`;

const SButton = styled.button`
  font-weight: bold;
  border-radius: 100px;
  padding: 10px 20px;
  &.today {
    background-color: #fff;
    border: 1px solid #333;
  }
  &.delete {
    background-color: red;
    color: #fff;
  }
`;
