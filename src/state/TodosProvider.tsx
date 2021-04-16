import React, { createContext, ReactNode, useState } from "react";

type contextValue = {
  todos: any;
  setTodos: any;
};

type Props = {
  children: ReactNode;
};

export const TodosContext = createContext({} as contextValue);

export const TodosProvider: React.VFC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Array<contextValue>>([]);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
