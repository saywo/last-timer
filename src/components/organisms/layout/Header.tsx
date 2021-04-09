import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { AuthContext } from "../../../auth/AuthProvider";

export const Header: React.FC = () => {
  const { isSignedIn, signOut } = useContext(AuthContext);

  const history = useHistory();
  const onClickSignin = useCallback((): void => {
    history.push("/signin");
  }, []);
  const onClickSignup = useCallback((): void => {
    history.push("/signup");
  }, []);
  const onClickSignout = useCallback((): void => {
    signOut(history);
  }, []);

  return (
    <SHeader>
      <SHeaderInner>
        <SHeaderLogo>
          <Link to="/">home</Link>
        </SHeaderLogo>
        <SHeaderContent>
          {isSignedIn || (
            <PrimaryButton onClick={onClickSignup}>登録</PrimaryButton>
          )}
          {isSignedIn || (
            <PrimaryButton onClick={onClickSignin}>ログイン</PrimaryButton>
          )}
          {isSignedIn && (
            <PrimaryButton onClick={onClickSignout}>ログアウト</PrimaryButton>
          )}
        </SHeaderContent>
      </SHeaderInner>
    </SHeader>
  );
};

const SHeader = styled.header`
  /* height: 80px; */
  /* background-color: #ccc; */
  border-bottom: 1px solid #ccc;
`;
const SHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  height: 100%;
`;
const SHeaderLogo = styled.div``;
const SHeaderContent = styled.div`
  button + button {
    margin-left: 20px;
  }
`;
