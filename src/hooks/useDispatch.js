import React from "react";
import { Context } from "store";

export const useDispatch = () => {
  const { dispatch } = React.useContext(Context);
  return dispatch;
};
