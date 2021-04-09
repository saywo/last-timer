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
  const { signIn, currentUser, isSignedIn } = useContext(AuthContext);

  return (
    <>
      <HeadingA>Signin</HeadingA>
      <InputArea>
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
      </InputArea>
      <button onClick={() => signIn(email, password, history)}>sign in</button>
      <div>email:{email}</div>
      <div>password:{password}</div>
      <p>currentUser:{currentUser}</p>
      <p>isSingedIn:{isSignedIn.toString()}</p>
    </>
  );
};
