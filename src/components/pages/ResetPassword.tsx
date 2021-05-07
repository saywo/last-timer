import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
  memo,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthInput } from "../atoms/AuthInput";
import { AuthButtonSubmit } from "../atoms/AuthButtonSubmit";
import { AuthForm } from "../molecules/AuthForm";
import { BlackBg } from "../templates/BlackBg";
import { AuthContext } from "../../auth/AuthProvider";

export const ResetPassword: VFC = memo(() => {
  type LocationStateType = {
    email: string;
  };

  const { state } = useLocation<LocationStateType>();
  const history = useHistory();
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState(state.email);

  const onChangeEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <BlackBg>
      <AuthForm
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword(email, history);
        }}
      >
        <AuthInput
          labelName="メールアドレス"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <AuthButtonSubmit value="パスワード再設定メールを送信"></AuthButtonSubmit>
      </AuthForm>
    </BlackBg>
  );
});
