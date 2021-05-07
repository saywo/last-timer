import React, {
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  useContext,
  memo,
} from "react";
import { InputItemAuth } from "../molecules/InputItemAuth";
import { InputListAuth } from "../molecules/InputListAuth";
import { AuthContext } from "../../auth/AuthProvider";
import { useHistory, useLocation } from "react-router-dom";
import AuthButton from "../atoms/button/AuthButton";
import { BlackBg } from "../templates/BlackBg";

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
      <InputListAuth
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword(email, history);
        }}
      >
        <InputItemAuth
          labelName="メールアドレス"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <AuthButton value="パスワード再設定メールを送信"></AuthButton>
      </InputListAuth>
    </BlackBg>
  );
});
