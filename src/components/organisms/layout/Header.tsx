import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import HeaderButton from "../../atoms/button/HeaderButton";
import { AuthContext } from "../../../auth/AuthProvider";

export const Header: React.FC = () => {
  const { isSignedIn, signOut } = useContext(AuthContext);

  const history = useHistory();
  const onClickSignin = useCallback((): void => {
    history.push("/signin");
  }, [history]);
  const onClickSignup = useCallback((): void => {
    history.push("/signup");
  }, [history]);
  const onClickSignout = useCallback((): void => {
    signOut(history);
  }, [history, signOut]);

  return (
    <SHeader>
      <SHeaderInner>
        <SHeaderLogo>
          <Link to="/">home</Link>
        </SHeaderLogo>
        <SHeaderContent>
          {isSignedIn || (
            <HeaderButton onClick={onClickSignup}>登録</HeaderButton>
          )}
          {isSignedIn || (
            <HeaderButton onClick={onClickSignin}>ログイン</HeaderButton>
          )}
          {isSignedIn && (
            <HeaderButton onClick={onClickSignout}>ログアウト</HeaderButton>
          )}
        </SHeaderContent>
      </SHeaderInner>
    </SHeader>
  );
};

const SHeader = styled.header`
  /* height: 80px; */
  background-color: #333;
`;
const SHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 40px;
  height: 100%;
`;
const SHeaderLogo = styled.div`
  color: #fff;
  font-weight: bold;
`;
const SHeaderContent = styled.div`
  button + button {
    margin-left: 20px;
  }
`;
