import React from "react";
import { INIT_STATE, reducer } from "./reducer";
import { setState } from "store/actions";
import { storage } from "objects";
import { fromStorage } from "./storageProvider";
import { Context } from "./Context";

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);
  React.useEffect(() => {
    const valueFromStorage = storage.getItem("s");

    if (!valueFromStorage) return;

    try {
      const state = fromStorage(valueFromStorage);
      dispatch(setState(state));
    } catch (error) {
      console.log("Invalid json: " + valueFromStorage);
    }
  }, [dispatch]);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
