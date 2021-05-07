import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
  memo,
} from "react";
import { useHistory } from "react-router";
import { AuthInput } from "../atoms/AuthInput";
import { AuthButtonSubmit } from "../atoms/AuthButtonSubmit";
import { AuthForm } from "../molecules/AuthForm";
import { BlackBg } from "../templates/BlackBg";
import { AuthContext } from "../../auth/AuthProvider";

export const Signup: VFC = memo(() => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const history = useHistory();

  // const onChangeName = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>): void => {
  //     setName(e.target.value);
  //   },
  //   [setName]
  // );
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
    <BlackBg>
      <AuthForm
        onSubmit={(e) => {
          e.preventDefault();
          signUp(email, password, passwordConfirm, history);
        }}
      >
        {/* <AuthInput
          labelName="名前"
          value={name}
          onChange={onChangeName}
          required
        /> */}
        <AuthInput
          labelName="メールアドレス"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <AuthInput
          labelName="パスワード"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <AuthInput
          labelName="パスワード（確認用）"
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          required
        />
        <AuthButtonSubmit value="登録"></AuthButtonSubmit>
      </AuthForm>
    </BlackBg>
  );
});
