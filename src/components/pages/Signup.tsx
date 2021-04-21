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
import { useHistory } from "react-router";
import AuthButton from "../atoms/button/AuthButton";
import { BlackBg } from "../templates/BlackBg";

export const Signup: VFC = React.memo(() => {
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
      <InputListAuth
        onSubmit={(e) => {
          e.preventDefault();
          signUp(email, password, passwordConfirm, history);
        }}
      >
        {/* <InputItemAuth
          labelName="名前"
          value={name}
          onChange={onChangeName}
          required
        /> */}
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
        <InputItemAuth
          labelName="パスワード（確認用）"
          type="password"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          required
        />
        <AuthButton value="登録"></AuthButton>
      </InputListAuth>
    </BlackBg>
  );
});
