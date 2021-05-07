import React, {
  useCallback,
  useContext,
  useState,
  ChangeEvent,
  VFC,
  memo,
} from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { db, firebaseTimestamp } from "../../firebase";
import styled from "styled-components";
import { TodosContext } from "../../state/TodosProvider";
import { AddTodoInput } from "../molecules/AddTodoInput";
import { AddTodoButton } from "../atoms/AddTodoButton";
import { colors, mediaQuery } from "../../styles/index";

const now = new Date();
const nowDate = [
  now.getFullYear(),
  ("0" + (now.getMonth() + 1)).slice(-2),
  ("0" + now.getDate()).slice(-2),
].join("-");

export const AddTodo: VFC = memo(() => {
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
        const newTodo = {
          uid: currentUser,
          name: name,
          date: date,
          createdAt: firebaseTimestamp.now(),
        };
        db.collection("todos")
          .add(newTodo)
          .then((docRef) => {
            //stateの配列には、firestoreの配列にfirestoreのdocIdを追加
            const updatedTodos = [...todos, { ...newTodo, id: docRef.id }];
            setTodos(updatedTodos);
            setName("");
            setDate(nowDate);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("名前を入力してください");
      }
      return e.preventDefault();
    },
    [currentUser, name, date, todos, setName, setDate, setTodos]
  );

  return (
    <SFormWrapper>
      <SForm onSubmit={onSubmitAdd}>
        <AddTodoInput
          labelName="名前"
          type="text"
          value={name}
          onChange={onChangeName}
          required
        />
        <AddTodoInput
          labelName="日付"
          type="date"
          max={nowDate}
          value={date}
          onChange={onChangeDate}
          required
        />
        <AddTodoButton />
      </SForm>
    </SFormWrapper>
  );
});

const SForm = styled.form`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-gap: 10px;
  ${mediaQuery.md} {
    padding: 0 30px;
    grid-template-columns: 1fr 1fr 80px 1fr;
    grid-gap: 20px;
  }
`;

const SFormWrapper = styled.div`
  background-color: ${colors.gray03};
  padding: 20px 0px;
  ${mediaQuery.md} {
    position: sticky;
    top: 0;
    left: 0;
  }
`;
