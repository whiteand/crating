import React from "react";
import { INIT_STATE, reducer } from "./reducer";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
