import React, {
  VFC,
  createContext,
  ReactNode,
  useEffect,
  useState,
  memo,
} from "react";
import firebase from "firebase/app";
import { auth } from "../firebase";
import * as H from "history";

type contextValue = {
  signUp: (
    email: string,
    password: string,
    passwordConfirm: string,
    history: H.History
  ) => void;
  signIn: (email: string, password: string, history: H.History) => void;
  resetPassword: (email: string, history: H.History) => void;
  signOut: (history: H.History) => void;
  currentUser: string | null;
  isSignedIn: boolean;
};

export const AuthContext = createContext<contextValue>({} as contextValue);

type Props = {
  children: ReactNode;
};

export const AuthProvider: VFC<Props> = memo(({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signUp = async (
    email: string,
    password: string,
    passwordConfirm: string,
    history: H.History
  ) => {
    try {
      if (password !== passwordConfirm) {
        throw new Error("確認用パスワードが正しくありません。");
      }
      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user: firebase.User | null): void => {
        if (user !== null) {
          setCurrentUser(user.uid);
        }
      });
      history.push("/");
    } catch (error) {
      alert(error.message);
      // console.log(error);
    }
  };

  const signIn = async (
    email: string,
    password: string,
    history: H.History
  ) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user: firebase.User | null): void => {
        if (user !== null) {
          setCurrentUser(user.uid);
        }
      });
      history.push("/");
    } catch (error) {
      alert("ご入力いただいた情報が正しくありません");
      // console.log(error.message);
    }
  };

  const resetPassword = async (email: string, history: H.History) => {
    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("パスワードリセットのためのメールを送信しました。");
        history.push("/signin");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("メールアドレスが登録されていません");
        } else {
          alert("メールアドレスが正しくありません");
        }
      });
  };

  const signOut = (history: H.History) => {
    auth.signOut();
    setCurrentUser(null);
    setIsSignedIn(false);
    history.push("/");
  };

  //初回アクセス時に認証済みかチェック
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        setIsSignedIn(true);
      } else {
        // alert("ログインしてください");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        resetPassword,
        signOut,
        currentUser,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
