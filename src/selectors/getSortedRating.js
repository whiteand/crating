import { sort, path } from "ramda";

export const getSortedRating = ({ items, isGreaterDict }) =>
  sort((key1, key2) => {
    const isGreater = path([key1, key2], isGreaterDict);
    if (isGreater === undefined) return 0;
    return isGreater ? 1 : -1;
  }, items);
