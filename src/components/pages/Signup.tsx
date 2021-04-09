import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
} from "react";
import { HeadingA } from "../atoms/text/HeadingA";
import { InputItem } from "../molecules/InputItem";
import { InputArea } from "../molecules/InputArea";
import { AuthContext } from "../../auth/AuthProvider";
import { useHistory } from "react-router";

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
  const { signUp, currentUser, isSignedIn } = useContext(AuthContext);

  return (
    <>
      <HeadingA>Signup</HeadingA>
      <InputArea>
        <InputItem
          label="名前"
          id="name"
          value={name}
          onChange={onChangeName}
        />
        <InputItem
          label="メールアドレス"
          id="email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        <InputItem
          label="パスワード"
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <InputItem
          label="パスワード（確認用）"
          id="passwordconfirm"
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
      </InputArea>
      <button onClick={() => signUp(email, password, history)}>sign up</button>
      <div>name:{name}</div>
      <div>email:{email}</div>
      <div>password:{password}</div>
      <p>currentUser:{currentUser}</p>
      <p>isSingedIn:{isSignedIn.toString()}</p>
    </>
  );
};
