import React, { useContext, VFC, useEffect, memo } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { AddTodo } from "../organisms/AddTodo";
import { TodoList } from "../organisms/TodoList";
import { BlackBg } from "../templates/BlackBg";
import styled from "styled-components";
import { colors, mediaQuery } from "../../styles/index";

export const Home: VFC = memo(() => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      {isSignedIn ? (
        <>
          <AddTodo />
          <TodoList />
        </>
      ) : (
        <BlackBg>
          <SHome>
            <h1>経過日数リスト</h1>
            <p>「最後に歯医者に行ったのいつだっけ...？」</p>
            <p>
              定期的にあるけど、
              <br className="sm-show" />
              忘れがちなイベントってありますよね。
            </p>
            <p>
              このアプリでは、そういった
              <br className="sm-show" />
              <span className="strong">
                定期的にあるけど忘れがちなイベントを記録
              </span>
              しておけます。
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
    font-size: 30px;
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
