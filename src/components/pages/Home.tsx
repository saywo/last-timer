import React, {
  useCallback,
  useContext,
  useState,
  VFC,
  ChangeEvent,
  useEffect,
} from "react";
import { AuthContext } from "../../auth/AuthProvider";
import styled from "styled-components";
import { db } from "../../firebase";

export const Home: VFC = () => {
  const now = new Date();
  const nowDate = [
    now.getFullYear(),
    ("0" + (now.getMonth() + 1)).slice(-2),
    ("0" + now.getDate()).slice(-2),
  ].join("-");

  type TodosProps = {
    name?: string;
    date?: string;
  };

  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>(nowDate);
  const [todos, setTodos] = useState<Array<TodosProps>>([
    { name: "hoge", date: "hage" },
    { name: "hoge2", date: "hage2" },
  ]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }, []);

  const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  }, []);

  const onSubmitAdd = useCallback((e) => {
    db.collection("todos")
      .add({
        name: name,
        date,
      })
      .then((docRef) => {
        console.log(docRef.id);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(name, date);
    return e.preventDefault();
  }, []);

  const getTodos = useCallback(() => {
    const fetchData = async () => {
      const temp: any = [...todos];
      await db
        .collection("todos")
        .get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            console.log(doc.id);
            temp.push({ name: `${doc.id}` });
          });
        });
      console.log(temp);
      setTodos(temp);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1>home</h1>
      {currentUser && <p>currentUser uid:{currentUser}</p>}
      <p>isSingedIn:{isSignedIn.toString()}</p>
      <form onSubmit={onSubmitAdd}>
        <SInput type="text" onChange={onChangeName} value={name} />
        <SInput type="date" onChange={onChangeDate} value={date} />
        <button type="submit">追加</button>
      </form>
      <div>
        {todos.map(({ name, date }, index) => (
          <p key={index}>
            {name}
            {date}
          </p>
        ))}
      </div>
    </>
  );
};

const SInput = styled.input`
  border: 1px solid #ccc;
`;
