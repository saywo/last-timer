import React, { VFC, memo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "../components/organisms/layout/Footer";
import { Header } from "../components/organisms/layout/Header";
import { Home } from "../components/pages/Home";
import { Signin } from "../components/pages/Signin";
import { Signup } from "../components/pages/Signup";
import { ResetPassword } from "../components/pages/ResetPassword";

export const Router: VFC = memo(() => {
  return (
    <BrowserRouter>
      <Header />
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/signin" component={Signin}></Route>
          <Route exact path="/resetpassword" component={ResetPassword}></Route>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
});
