import React, { useState } from "react";
import { createContext } from "react";
import { LoginModalProviderProps } from "./types";

export const LoginModalContext = createContext({
  isModalOpen: false,
  toggleModal: () => {},
});

const LoginModalProvider = ({ children }: LoginModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <LoginModalContext.Provider
      value={{ isModalOpen, toggleModal: handleToggleModal }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalProvider;
