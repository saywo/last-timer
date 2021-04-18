import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import * as H from "history";

type contextValue = {
  signUp: any;
  signIn: any;
  signOut: any;
  currentUser: string | null;
  isSignedIn: boolean;
};

export const AuthContext = createContext<contextValue>({} as contextValue);

type Props = {
  children: ReactNode;
};

// interface ChildComponent extends RouteComponentProps {
//   email: string;
//   password: string;
// }

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signUp = async (
    email: string,
    password: string,
    history: H.History
  ) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user: any): void => {
        setCurrentUser(user.uid);
      });
      history.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const signIn = async (email: string, password: string, history: any) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user: any): void => {
        setCurrentUser(user.uid);
      });
      history.push("/");
      // db.collection("users")
      //   .add({
      //     first: "Alan",
      //     middle: "Mathison",
      //     last: "Turing",
      //     born: 1912,
      //   })
      //   .then((docRef) => {
      //     console.log("Document written with ID: ", docRef.id);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });
    } catch (error) {
      alert(error.message);
    }
  };

  const signOut = (history: any) => {
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
        signOut,
        currentUser,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
