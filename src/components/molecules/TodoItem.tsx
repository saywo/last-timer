import React, { VFC, useCallback, memo } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { TodoButton } from "../atoms/TodoButton";
import { colors, mediaQuery } from "../../styles/index";

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

export const TodoItem: VFC<Props> = memo(({ id, name, date }) => {
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

  // useEffect(() => {
  //   console.log("itemです！");
  // });

  return (
    <SItem>
      <SName>{name}</SName>
      <SDate>{date}</SDate>
      <SSince>
        <span className="label">前回から：</span>
        {timeGapInt}日
      </SSince>
      {nowDate !== date ? (
        <SButtonWrap>
          <TodoButton
            className="record_today"
            onClick={() => onClickRecord(id)}
          >
            今日やった
          </TodoButton>
        </SButtonWrap>
      ) : (
        <div></div>
      )}
      <SButtonWrap>
        <TodoButton className="delete" onClick={() => onClickDelete(id)}>
          削除する
        </TodoButton>
      </SButtonWrap>
    </SItem>
  );
});

const SItem = styled.li`
  display: grid;
  align-items: start;
  grid-column-gap: 10px;
  grid-row-gap: 5px;
  padding: 10px;
  border-bottom: 1px solid ${colors.gray03};
  &:hover {
    background-color: ${colors.gray04};
  }
  grid-template-columns: calc((100% - 10px) / 2) calc((100% - 10px) / 2);
  grid-template-areas:
    "name name"
    "date date"
    "since since "
    ". . ";
  ${mediaQuery.md} {
    grid-row-gap: 10px;
    grid-template-rows: 1fr;
  }
  ${mediaQuery.lg} {
    grid-template-areas: "name date since . .";
    grid-template-columns: 2fr 1fr 0.5fr 1fr 1fr;
  }
`;

const SItemData = styled.p`
  /* padding: 5px 0; */
  ${mediaQuery.lg} {
    padding: 10px 0;
    word-break: break-all;
  }
`;

const SName = styled(SItemData)`
  min-width: 200px;
  grid-area: name;
  font-weight: bold;
  font-size: 20px;
  ${mediaQuery.lg} {
    font-size: 16px;
    font-weight: normal;
  }
`;

const SDate = styled(SItemData)`
  min-width: 150px;
  grid-area: date;
`;

const SSince = styled(SItemData)`
  grid-area: since;
  .label {
    ${mediaQuery.lg} {
      display: none;
    }
  }
`;

const SButtonWrap = styled.div`
  padding: 4.5px 0;
`;
