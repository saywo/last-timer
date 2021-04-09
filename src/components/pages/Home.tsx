import React, { useContext, VFC } from "react";
import { AuthContext } from "../../auth/AuthProvider";

export const Home: VFC = () => {
  const { currentUser, isSignedIn } = useContext(AuthContext);

  return (
    <>
      <h1>home</h1>
      {currentUser && <p>currentUser uid:{currentUser}</p>}
      <p>isSingedIn:{isSignedIn.toString()}</p>
    </>
  );
};
