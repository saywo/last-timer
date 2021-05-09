import React, {
  VFC,
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
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
  const [sortFlag, setSortFlag] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const fetchData = () => {
    db.collection("todos")
      .where("uid", "==", `${currentUser}`)
      .orderBy("date", sortFlag ? "desc" : "asc")
      .onSnapshot((snapShot) => {
        const temp: any = [];
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

  const sortTodos = async () => {
    const flag = sortFlag ? 1 : -1;
    const sortedTodos = await todos.sort((a, b) => {
      if (a.date > b.date) {
        return flag;
      } else {
        return -1 * flag;
      }
    });
    await setTodos(sortedTodos);
    console.log(todos);
    console.log(sortFlag);
  };

  useEffect(() => {
    fetchData();
  }, [sortFlag, currentUser]);

  useEffect(() => {
    sortTodos();
  }, [sortFlag]);

  return (
    <TodosContext.Provider value={{ todos, setTodos, sortFlag, setSortFlag }}>
      {children}
    </TodosContext.Provider>
  );
};
