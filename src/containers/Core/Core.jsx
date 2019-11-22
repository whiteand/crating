import React from "react";
import { useSelector, useDispatch } from "hooks";
import { addItem } from "store";

export const Core = () => {
  const itemsLength = useSelector(state => {
    return state.items.length;
  });
  const dispatch = useDispatch();
  return (
    <button type="button" onClick={() => dispatch(addItem("Andrew"))}>
      Core Container: {itemsLength}
    </button>
  );
};
