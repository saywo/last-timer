import React, { useContext } from "react";
import styled from "styled-components";
import { TodosContext } from "../../state/TodosProvider";
import { TodoItem } from "../molecules/TodoItem";

export const TodoList: React.VFC = () => {
  const { todos } = useContext(TodosContext);
  return (
    <STodoInner>
      <STodoHead>
        <STodoHeadItem>名前</STodoHeadItem>
        <STodoHeadItem>日付</STodoHeadItem>
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
};

const STodoHead = styled.ul`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 20px 0;
`;

const STodoHeadItem = styled.li`
  padding: 0 10px;
  font-weight: bold;
`;

const STodoList = styled.ul`
  /* display: grid; */
  /* grid-gap: 10px; */
`;

const STodoInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;
