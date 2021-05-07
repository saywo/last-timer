import React, { VFC, createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

type TodosProps = {
  uid: string | null;
  id: string;
  name: string;
  date: string;
};

type contextValue = {
  todos: Array<TodosProps>;
  setTodos: (todos: Array<TodosProps>) => void;
};

export const TodosContext = createContext({} as contextValue);

export const TodosProvider: VFC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Array<TodosProps>>([]);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
