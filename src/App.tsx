import React from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { Router } from "./router/Router";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router></Router>
    </AuthProvider>
  );
};
