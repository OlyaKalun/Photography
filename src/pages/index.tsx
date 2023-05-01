import React from "react";
import Home from "./home";
import LoginModalProvider from "../context/modal.context";
import LoginForm from "../components/auth/LoginForm";

export default function HomePage() {
  return (
    <LoginModalProvider>
      <Home />
      <LoginForm />
    </LoginModalProvider>
  );
}
