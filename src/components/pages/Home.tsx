import React, { useContext, VFC, useEffect, memo } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { db } from "../../firebase";
import { TodosContext } from "../../state/TodosProvider";
import { AddItem } from "../organisms/AddItem";
import { TodoList } from "../organisms/TodoList";
import { BlackBg } from "../templates/BlackBg";
import styled from "styled-components";
import { colors } from "../../styles/const/colors";
import { mediaQuery } from "../../styles/const/size";

export const Home: VFC = memo(() => {
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const { todos, setTodos } = useContext(TodosContext);

  const fetchData = async () => {
    let temp = todos;
    temp.length = 0;
    await db
      .collection("todos")
      .where("uid", "==", `${currentUser}`)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapShot) => {
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
      {/* {currentUser && <p>currentUser uid:{currentUser}</p>}
      <p>isSingedIn:{isSignedIn.toString()}</p> */}
      {isSignedIn ? (
        <>
          <AddItem />
          <TodoList />
        </>
      ) : (
        <BlackBg>
          <SHome>
            <h1>前回からの日数リスト</h1>
            <p>「最後に歯医者に行ったのいつだっけ...？」</p>
            <p>
              定期的にあるけど、
              <br className="sm-show" />
              忘れがちなイベントってありますよね。
            </p>
            <p>
              このアプリは、
              <br className="sm-show" />
              そういった
              <span className="strong">
                定期的にあるけど忘れがちなイベントを記録
              </span>
              することに特化しています。
            </p>
          </SHome>
        </BlackBg>
      )}
    </>
  );
});

const SHome = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  color: ${colors.white01};
  padding-top: 60px;
  h1 {
    font-weight: bold;
    font-size: calc((30 / 375) * 100vw);
    ${mediaQuery.md} {
      font-size: 40px;
    }
    & + p {
      margin-top: 2em;
    }
  }
  p {
    .sm-show {
      display: block;
      ${mediaQuery.md} {
        display: block;
      }
    }
    .strong {
      font-weight: bold;
    }
    & + p {
      margin-top: 1em;
    }
  }
`;
