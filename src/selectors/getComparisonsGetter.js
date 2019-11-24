import { pathOr, toPairs, map, pipe } from "ramda";

export const getComparisonsGetter = ratingListId => state => item =>
  pipe(
    pathOr({}, [ratingListId, "isGreaterDict", item]),
    toPairs,
    map(([item2, isItemGreater]) =>
      isItemGreater ? [item, item2] : [item2, item]
    )
  )(state);
