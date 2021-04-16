import React, {
  useCallback,
  useContext,
  useState,
  ChangeEvent,
  VFC,
} from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { db } from "../../firebase";
import styled from "styled-components";
import { TodosContext } from "../../state/TodosProvider";

const now = new Date();
const nowDate = [
  now.getFullYear(),
  ("0" + (now.getMonth() + 1)).slice(-2),
  ("0" + now.getDate()).slice(-2),
].join("-");

export const AddItem: VFC = () => {
  const { currentUser } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>(nowDate);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }, []);

  const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  }, []);

  const onSubmitAdd = useCallback(
    (e) => {
      if (name !== "") {
        const newTodo = { uid: currentUser, name: name, date: date };
        db.collection("todos")
          .add(newTodo)
          .then((docRef) => {
            //stateの配列には、firestoreの配列にfirestoreのdocIdを追加
            const updatedTodos = [...todos, { ...newTodo, id: docRef.id }];
            setTodos(updatedTodos);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("名前を入力してください");
      }
      return e.preventDefault();
    },
    [name, date, todos]
  );

  return (
    <form onSubmit={onSubmitAdd}>
      <label htmlFor="name">名前</label>
      <SInput id="name" type="text" onChange={onChangeName} value={name} />
      <label htmlFor="date">日付</label>
      <SInput id="date" type="date" onChange={onChangeDate} value={date} />
      <button type="submit">追加</button>
    </form>
  );
};

const SInput = styled.input`
  border: 1px solid #ccc;
`;
