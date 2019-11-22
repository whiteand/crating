import { ActionType } from "./types";

export const addItem = (item, index) => ({
  type: ActionType.AddItem,
  item,
  index
});

export const addComparison = (greater, less) => ({
  type: ActionType.AddComparison,
  greater,
  less
});

export const setRatingId = ratingId => ({
  type: ActionType.SetRatingId,
  ratingId
});
