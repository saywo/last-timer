import React from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { Router } from "./router/Router";
import { TodosProvider } from "./state/TodosProvider";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <TodosProvider>
        <Router></Router>
      </TodosProvider>
    </AuthProvider>
  );
};
