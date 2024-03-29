import {
  always,
  assoc,
  assocPath,
  complement,
  curry,
  dissoc,
  dissocPath,
  equals,
  filter,
  identity,
  ifElse,
  includes,
  insert,
  lensPath,
  map,
  over,
  pathOr,
  pipe
} from "ramda";
import { storage } from "objects";
import { toStorageValue } from "./storageProvider";
import { ActionType } from "./types";

export const INIT_STATE = {};

const HANDLERS = {
  [ActionType.AddItem]: curry(({ item, index, ratingListId }, state) =>
    over(
      lensPath([ratingListId, "items"]),
      ifElse(
        includes(item),
        identity,
        insert(
          index === undefined
            ? pathOr(0, [ratingListId, "items", "length"], state)
            : index,
          item
        )
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
    ),
  [ActionType.SetState]: ({ state }) => always(state)
};

export const reducer = (state, action) => {
  if (!action) return state;

  const handler = HANDLERS[action.type];

  if (!handler) return state;

  const newState = handler(action)(state);

  storage.setItem("s", toStorageValue(newState));

  return newState;
};
