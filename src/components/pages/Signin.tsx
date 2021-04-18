import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
} from "react";
import { HeadingA } from "../atoms/text/HeadingA";
import { InputItemAuth } from "../molecules/InputItemAuth";
import { InputListAuth } from "../molecules/InputListAuth";
import { AuthContext } from "../../auth/AuthProvider";
import { useHistory } from "react-router";
import AuthButton from "../atoms/button/AuthButton";

export const Signin: VFC = () => {
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
    <>
      <HeadingA>Signin</HeadingA>
      <InputListAuth>
        <InputItemAuth
          labelName="メールアドレス"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        <InputItemAuth
          labelName="パスワード"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <AuthButton onClick={() => signIn(email, password, history)}>
          ログイン
        </AuthButton>
      </InputListAuth>
    </>
  );
};
