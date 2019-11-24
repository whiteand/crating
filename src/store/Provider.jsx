import React from "react";
import { INIT_STATE, reducer } from "./reducer";
import { setState } from "store/actions";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);
  React.useEffect(() => {
    const fromLocalStorage = localStorage.getItem("state");

    if (!fromLocalStorage) return;

    try {
      const state = JSON.parse(fromLocalStorage);

      dispatch(setState(state));
    } catch (error) {
      console.log("Invalid json: " + fromLocalStorage);
    }
  }, [dispatch]);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
