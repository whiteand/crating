import React from "react";
import { INIT_STATE, reducer } from "./reducer";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const fromLocalStorage = localStorage.getItem("state");
  if (!fromLocalStorage) {
    localeStorage.setItem("state", JSON.stringify(INIT_STATE));
  }
  const [state, dispatch] = React.useReducer(
    reducer,
    fromLocalStorage ? JSON.parse(fromLocalStorage) : INIT_STATE
  );
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
