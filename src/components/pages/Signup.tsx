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

export const Signup: VFC = () => {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState("");

  const history = useHistory();

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setName(e.target.value);
    },
    [setName]
  );
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
  const onChangePasswordConfirm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
    },
    [setPasswordConfirm]
  );
  const { signUp } = useContext(AuthContext);

  return (
    <>
      <HeadingA>Signup</HeadingA>
      <InputListAuth>
        <InputItemAuth labelName="名前" value={name} onChange={onChangeName} />
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
        <InputItemAuth
          labelName="パスワード（確認用）"
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
        <AuthButton onClick={() => signUp(email, password, history)}>
          登録
        </AuthButton>
      </InputListAuth>
    </>
  );
};
