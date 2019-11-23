import {
  assoc,
  assocPath,
  complement,
  curry,
  dissoc,
  dissocPath,
  equals,
  filter,
  insert,
  lensPath,
  map,
  over,
  pathOr,
  pipe
} from "ramda";
import { ActionType } from "./types";

export const INIT_STATE = {
  testRatingList: {
    items: [],
    isGreaterDict: {}
  }
};

const HANDLERS = {
  [ActionType.AddItem]: curry(({ item, index, ratingListId }, state) =>
    over(
      lensPath([ratingListId, "items"]),
      insert(
        index === undefined
          ? pathOr(0, [ratingListId, "items", "length"], state)
          : index,
        item
      ),
      state
    )
  ),
  [ActionType.AddComparison]: ({ greater, ratingListId, less }) =>
    over(
      lensPath([ratingListId, "isGreaterDict"]),
      pipe(assocPath([greater, less], true), assocPath([less, greater], false))
    ),
  [ActionType.CreateRatingList]: ({ ratingListId }) =>
    assoc(ratingListId, {
      items: [],
      isGreaterDict: {},
      ratingListId
    }),
  [ActionType.RemoveItem]: ({ ratingListId, item, withComoparisons }) =>
    withComoparisons
      ? pipe(
          over(
            lensPath([ratingListId, "items"]),
            filter(complement(equals(item)))
          ),
          over(
            lensPath([ratingListId, "isGreaterDict"]),
            pipe(dissoc(item), map(dissoc(item)))
          )
        )
      : over(
          lensPath([ratingListId, "items"]),
          filter(complement(equals(item)))
        ),
  [ActionType.RemoveRatingList]: ({ ratingListId }) => dissoc(ratingListId),
  [ActionType.RemoveComparison]: ({ ratingListId, item1, item2 }) =>
    over(
      lensPath([ratingListId, "isGreaterDict"]),
      item2 === undefined
        ? pipe(dissoc(item1), map(dissoc(item1)))
        : pipe(dissocPath([item1, item2]), dissocPath([item2, item1]))
    )
};

export const reducer = (state, action) => {
  if (!action) return state;

  const handler = HANDLERS[action.type];

  if (!handler) return state;

  return handler(action)(state);
};
