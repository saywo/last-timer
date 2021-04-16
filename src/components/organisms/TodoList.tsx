import React, { useContext } from "react";
import { TodosContext } from "../../state/TodosProvider";
import { TodoItem } from "../molecules/TodoItem";

export const TodoList: React.VFC = () => {
  const { todos } = useContext(TodosContext);
  return (
    <ul>
      {todos.map(
        ({ id, name, date }: { id: string; name: string; date: string }) => (
          <TodoItem key={id} id={id} name={name} date={date}></TodoItem>
        )
      )}
    </ul>
  );
};
