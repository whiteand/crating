import { assoc, over, curry, lensProp, insert, assocPath, pipe } from "ramda";
import { ActionType } from "./types";

export const INIT_STATE = {
  ratingId: null,
  items: [],
  isGreaterDict: {}
};

const HANDLERS = {
  [ActionType.AddItem]: curry(({ item, index }, state) =>
    over(
      lensProp("items"),
      insert(index === undefined ? state.items.length : index, item),
      state
    )
  ),
  [ActionType.AddComparison]: ({ greater, less }) =>
    over(
      lensProp("isGreaterDict"),
      pipe(assocPath([greater, less], true), assocPath([less, greater], false))
    ),
  [ActionType.SetRatingId]: ({ ratingId }) => assoc("ratingId", ratingId)
};

export const reducer = (state, action) => {
  if (!action) return state;

  const handler = HANDLERS[action.type];

  if (!handler) return state;

  return handler(action)(state);
};
