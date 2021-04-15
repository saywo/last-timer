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
import { TodoItem } from "../molecules/TodoItem";

export const Home: VFC = () => {
  const now = new Date();
  const nowDate = [
    now.getFullYear(),
    ("0" + (now.getMonth() + 1)).slice(-2),
    ("0" + now.getDate()).slice(-2),
  ].join("-");

  type TodosProps = {
    name?: string;
    id?: string;
    date?: string;
  };

  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>(nowDate);
  const [todos, setTodos] = useState<Array<TodosProps>>([]);

  const getTodos = useCallback(() => {
    const fetchData = async () => {
      const temp: any = [];
      await db
        .collection("todos")
        .where("uid", "==", `${currentUser}`)
        .onSnapshot((snapShot) => {
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
          console.log(temp);
        });
      // .then(() => {
      //   setTodos(temp);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      // await db
      //   .collection("todos")
      //   .where("uid", "==", `${currentUser}`)
      //   .get()
      //   .then((snapShot) => {
      //     snapShot.forEach((doc) => {
      //       const data = doc.data();
      //       temp.push({
      //         uid: currentUser,
      //         id: `${doc.id}`,
      //         name: `${data.name}`,
      //         date: `${data.date}`,
      //       });
      //     });
      //   })
      //   .then(() => {
      //     setTodos(temp);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    };
    fetchData();
  }, [currentUser]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  }, []);

  const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  }, []);

  const onClickRecord = useCallback(async (id) => {
    // console.log(id);
    await db
      .collection("todos")
      .doc(id)
      .update({
        date: nowDate,
      })
      .then(() => {
        // console.log(todos);
        // console.log("update date !");
      });
  }, []);

  const onSubmitAdd = useCallback(
    (e) => {
      if (name !== "") {
        db.collection("todos")
          .add({
            uid: currentUser,
            name: name,
            date: date,
          })
          .then((docRef) => {
            console.log(docRef.id);
          })
          .catch((error) => {
            console.error(error);
          });
        // console.log(name, date);
        getTodos();
      } else {
        alert("名前を入力してください");
      }
      return e.preventDefault();
    },
    [name, date, currentUser, getTodos]
  );

  useEffect(() => {
    getTodos();
    console.log(currentUser);
    console.log(todos);
  }, [currentUser]);

  return (
    <>
      <h1>home</h1>
      {currentUser && <p>currentUser uid:{currentUser}</p>}
      <p>isSingedIn:{isSignedIn.toString()}</p>
      {isSignedIn && (
        <>
          <form onSubmit={onSubmitAdd}>
            <SInput type="text" onChange={onChangeName} value={name} />
            <SInput type="date" onChange={onChangeDate} value={date} />
            <button type="submit">追加</button>
          </form>
          <ul>
            {todos.map(({ id, name, date }) => (
              <TodoItem
                key={id}
                id={id}
                name={name}
                date={date}
                onClickRecord={onClickRecord}
              ></TodoItem>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const SInput = styled.input`
  border: 1px solid #ccc;
`;
