import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../components/organisms/layout/Header";
import { Home } from "../components/pages/Home";
import { Signin } from "../components/pages/Signin";
import { Signup } from "../components/pages/Signup";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
      </Switch>
    </BrowserRouter>
  );
};
