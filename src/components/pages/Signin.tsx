import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
} from "react";
import { InputItemAuth } from "../molecules/InputItemAuth";
import { InputListAuth } from "../molecules/InputListAuth";
import { AuthContext } from "../../auth/AuthProvider";
import { Link, useHistory } from "react-router-dom";
import AuthButton from "../atoms/button/AuthButton";
import { BlackBg } from "../templates/BlackBg";
import styled from "styled-components";

export const Signin: VFC = React.memo(() => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const history = useHistory();

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );
  const { signIn } = useContext(AuthContext);

  return (
    <BlackBg>
      <InputListAuth
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, password, history);
        }}
      >
        <InputItemAuth
          labelName="メールアドレス"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <InputItemAuth
          labelName="パスワード"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <AuthButton value="ログイン"></AuthButton>
        <SLinkWrap>
          <Link
            to={{
              pathname: "/resetpassword",
              state: { email },
            }}
          >
            パスワードを忘れましたか？
          </Link>
        </SLinkWrap>
      </InputListAuth>
    </BlackBg>
  );
});

const SLinkWrap = styled.div`
  text-align: right;
  a {
    font-size: 14px;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }
`;
