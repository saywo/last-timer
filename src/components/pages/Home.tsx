import React, { useContext, VFC, useEffect } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import styled from "styled-components";
import { db } from "../../firebase";
import { TodosContext } from "../../state/TodosProvider";
import { AddItem } from "../organisms/AddItem";
import { TodoList } from "../organisms/TodoList";

export const Home: VFC = () => {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { setTodos } = useContext(TodosContext);

  const fetchData = async () => {
    let temp: any = [];
    await db
      .collection("todos")
      .where("uid", "==", `${currentUser}`)
      .onSnapshot((snapShot) => {
        // console.log(snapShot);
        temp = [];
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

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  return (
    <>
      {currentUser && <p>currentUser uid:{currentUser}</p>}
      <p>isSingedIn:{isSignedIn.toString()}</p>
      {isSignedIn && (
        <>
          <AddItem />
          <TodoList />
        </>
      )}
    </>
  );
};
