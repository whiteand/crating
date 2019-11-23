import { ActionType } from "./types";

export const addItem = (ratingListId, item, index) => ({
  type: ActionType.AddItem,
  item,
  index,
  ratingListId
});

export const addComparison = (ratingListId, greater, less) => ({
  type: ActionType.AddComparison,
  greater,
  less,
  ratingListId
});

export const createRatingList = ratingListId => ({
  type: ActionType.CreateRatingList,
  ratingListId
});

export const removeItem = (ratingListId, item, withComoparisons = false) => ({
  type: ActionType.RemoveItem,
  item,
  ratingListId,
  withComoparisons
});

export const removeRatingList = ratingListId => ({
  type: ActionType.RemoveRatingList,
  ratingListId
});

export const removeComparison = (ratingListId, item1, item2) => ({
  type: ActionType.RemoveComparison,
  ratingListId,
  item1,
  item2
});
