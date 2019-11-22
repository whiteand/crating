import React from "react";
import { Context } from "store";

export const useSelector = selector => {
  const { state } = React.useContext(Context);
  return React.useMemo(() => selector(state), [state, selector]);
};
