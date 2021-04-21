import React, { createContext, ReactNode, useState } from "react";

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
  setTodos: any;
};

export const TodosContext = createContext({} as contextValue);

export const TodosProvider: React.VFC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Array<TodosProps>>([]);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
