import React, { useContext } from "react";
import styled from "styled-components";
import { TodosContext } from "../../state/TodosProvider";
import { TodoItem } from "../molecules/TodoItem";

export const TodoList: React.VFC = () => {
  const { todos } = useContext(TodosContext);
  return (
    <TodoWrap>
      {todos.map(
        ({ id, name, date }: { id: string; name: string; date: string }) => (
          <TodoItem key={id} id={id} name={name} date={date}></TodoItem>
        )
      )}
    </TodoWrap>
  );
};

const TodoWrap = styled.ul`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;
