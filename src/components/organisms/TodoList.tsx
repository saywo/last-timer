import React, { VFC, useContext, memo } from "react";
import styled from "styled-components";
import { TodosContext } from "../../state/TodosProvider";
import { TodoItem } from "../molecules/TodoItem";
import { colors, mediaQuery } from "../../styles/index";

export const TodoList: VFC = memo(() => {
  const { todos, setTodos } = useContext(TodosContext);
  const onClickSortDate = () => {
    setTodos(
      todos.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      })
    );
  };
  return (
    <STodoInner>
      <STodoHead>
        <STodoHeadItem>名前</STodoHeadItem>
        <STodoHeadItem onClick={onClickSortDate}>日付</STodoHeadItem>
        <STodoHeadItem>前回から</STodoHeadItem>
      </STodoHead>
      <STodoList>
        {todos.map(
          ({ id, name, date }: { id: string; name: string; date: string }) => (
            <TodoItem key={id} id={id} name={name} date={date}></TodoItem>
          )
        )}
      </STodoList>
    </STodoInner>
  );
});

const STodoHead = styled.ul`
  display: none;
  ${mediaQuery.lg} {
    display: grid;
    grid-template-columns: 2fr 1.25fr 0.5fr 1fr 1fr;
    grid-gap: 10px;
    padding: 20px 10px;
    border-bottom: 1px solid ${colors.gray03};
  }
`;

const STodoHeadItem = styled.li`
  font-weight: bold;
`;

const STodoList = styled.ul`
  /* display: grid; */
  /* grid-gap: 10px; */
`;

const STodoInner = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px 20px;
  ${mediaQuery.md} {
    padding: 0 20px 40px;
  }
`;
