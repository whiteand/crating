import { map, pipe, toPairs, assocPath, fromPairs } from "ramda";

const getSmallState = pipe(
  map(rating => {
    if (!rating) return undefined;
    const { items, isGreaterDict } = rating;
    const itemToDigitDict = items.reduce((dict, item, index) => {
      dict[item] = index;
      return dict;
    }, {});
    const comparisons = [];
    const pairs = toPairs(isGreaterDict);
    for (let [item1, items2] of pairs) {
      const items2Pairs = toPairs(items2);
      for (let [item2, isItem1Greater] of items2Pairs) {
        if (isItem1Greater) {
          comparisons.push(itemToDigitDict[item1], itemToDigitDict[item2]);
        }
      }
    }
    return { i: items, c: comparisons };
  })
);

export const toStorageValue = state => {
  const smallState = getSmallState(state);

  return JSON.stringify(smallState);
};

const getLargeState = pipe(
  toPairs,
  map(([ratingListId, { i: items, c }]) => {
    let isGreaterDict = {};

    for (let i = 0; i < c.length; i += 2) {
      const greaterIndex = c[i];
      const lessIndex = c[i + 1];
      const greaterItem = items[greaterIndex];
      const lessItem = items[lessIndex];
      isGreaterDict = assocPath([greaterItem, lessItem], true, isGreaterDict);
      isGreaterDict = assocPath([lessItem, greaterItem], false, isGreaterDict);
    }

    return [
      ratingListId,
      {
        items,
        isGreaterDict,
        ratingListId
      }
    ];
  }),
  fromPairs
);

export const fromStorage = code => {
  const smallState = JSON.parse(code);
  return getLargeState(smallState);
};
