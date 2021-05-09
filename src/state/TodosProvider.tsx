import React, {
  VFC,
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { db } from "../firebase";
import { AuthContext } from "../auth/AuthProvider";

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
  sortFlag: boolean;
  setSortFlag: (sortFlag: boolean) => void;
};

export const TodosContext = createContext({} as contextValue);

export const TodosProvider: VFC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Array<TodosProps>>([]);
  const [sortFlag, setSortFlag] = useState<boolean>(true);
  const { currentUser } = useContext(AuthContext);

  const fetchData = () => {
    db.collection("todos")
      .where("uid", "==", `${currentUser}`)
      .orderBy("date", sortFlag ? "asc" : "desc")
      .onSnapshot((snapShot) => {
        const temp: Array<TodosProps> = [];
        snapShot.forEach((doc) => {
          const data = doc.data();
          temp.push({
            uid: currentUser,
            id: `${doc.id}`,
            name: `${data.name}`,
            date: `${data.date}`,
          });
        });
        setTodos(temp);
      });
  };

  const sortTodos = useCallback(async () => {
    const flag = sortFlag ? 1 : -1;
    const sortedTodos: Array<TodosProps> = await [...todos].sort((a, b) => {
      if (a.date > b.date) {
        return flag;
      } else {
        return -1 * flag;
      }
    });
    await setTodos(sortedTodos);
    // eslint-disable-next-line
  }, [sortFlag]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [sortFlag, currentUser]);

  useEffect(() => {
    sortTodos();
  }, [sortTodos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos, sortFlag, setSortFlag }}>
      {children}
    </TodosContext.Provider>
  );
};
