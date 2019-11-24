import { converge, sort, path, pathOr } from "ramda";

const sortAndCollectUndefinedComparisons = (items, isGreaterDict) => {
  const undefinedComparisons = [];

  sort((a, b) => {
    const isAGreaterB = path([a, b], isGreaterDict);
    if (isAGreaterB === undefined) {
      undefinedComparisons.push([a, b]);
      return 0;
    }

    return isAGreaterB ? -1 : 1;
  }, items);

  return undefinedComparisons;
};

export const getComparisonsToMake = ratingListId =>
  converge(sortAndCollectUndefinedComparisons, [
    pathOr([], [ratingListId, "items"]),
    pathOr({}, [ratingListId, "isGreaterDict"])
  ]);
