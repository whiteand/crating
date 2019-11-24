import { sort, path, pathOr } from "ramda";

export const getSortedRating = ratingListId => state =>
  sort((key1, key2) => {
    const isGreater = path([ratingListId, "isGreaterDict", key1, key2], state);
    if (isGreater === undefined) return 0;
    return isGreater ? 1 : -1;
  }, pathOr([], [ratingListId, "items"], state));
