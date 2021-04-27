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
            className="reset-password"
          >
            パスワードを忘れましたか？
          </Link>
        </SLinkWrap>
        <STestUserInfo>
          <p className="test-user_title">テストユーザー用のログイン情報</p>
          <p className="test-user_desc">登録不要で本サービスをお試し頂けます。</p>
          <div className="test-user_list">
            <dl className="test-user_item">
              <dt className="test-user_name">メールアドレス</dt>
              <dd className="test-user_content">test@gmail.com</dd>
            </dl>
            <dl className="test-user_item">
              <dt className="test-user_name">パスワード</dt>
              <dd className="test-user_content">testpassword54321</dd>
            </dl>
          </div>
        </STestUserInfo>
      </InputListAuth>
    </BlackBg>
  );
});

const SLinkWrap = styled.div`
  text-align: right;
  .reset-password {
    font-size: 14px;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }
`;

const STestUserInfo = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 20px;
  .test-user_title {
    font-size: 16px;
    font-weight: bold;
  }
  .test-user_desc {
    font-size: 14px;
  }
  .test-user_list {
    margin-top: 20px;
  }
  .test-user_item {
    font-size: 14px;
    & + .test-user_item {
      margin-top: 20px;
    }
  }
  .test-user_name {
  }
  .test-user_content {
    margin-top: 5px;
  }
`;
