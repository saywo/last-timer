import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import HeaderButton from "../../atoms/button/HeaderButton";
import { AuthContext } from "../../../auth/AuthProvider";
import { colors } from "../../../styles/const/colors";
import { mediaQuery } from "../../../styles/const/size";

export const Header: React.FC = React.memo(() => {
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
        {/* <SHeaderLogo>
          <Link to="/">homeへ</Link>
        </SHeaderLogo> */}
        <SHeaderContent>
          {isSignedIn || (
            <HeaderButton buttonType="cv" onClick={onClickSignup}>
              登録
            </HeaderButton>
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
});

const SHeader = styled.header`
  /* height: 80px; */
  background-color: ${colors.black01};
`;
const SHeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 10px 20px;
  ${mediaQuery.md} {
    padding: 10px 40px;
  }
`;
// const SHeaderLogo = styled.div`
//   color: ${colors.white01};
//   font-weight: bold;
// `;
const SHeaderContent = styled.div`
  button + button {
    margin-left: 10px;
    ${mediaQuery.md} {
      margin-left: 20px;
    }
  }
`;
