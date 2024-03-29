import { map, pipe, toPairs, assocPath, fromPairs } from "ramda";
import { e as v } from 'quartet'

const CODES = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
  ""
);

const decodeNumbers = waycode => {
  const way = waycode[0];
  const code = waycode.slice(1);

  if (!code) return []

  if (way === "s") {
    return code.split("_").map(numberString => {
      const number = Number.parseInt(numberString)
      if (Number.isNaN(number)) {
        throw new Error('wrong number: ' + JSON.stringify(numberString))
      }
      return number
    });
  }
  if (way === "c") {
    return code.split("").map(char => {
      const index = CODES.indexOf(char)
      if (index < 0) {
        throw new Error('wrong code: ' + char)
      }
      return index
    });
  }
  return JSON.parse(waycode);
};

const encodeNumbers = (way, numbers) => {
  if (way === "s") {
    return "s" + numbers.map(e => e.toString()).join("_");
  }
  if (way === "c") {
    return "c" + numbers.map(number => CODES[number]).join("");
  }
  return JSON.stringify(numbers);
};

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

    const encodeWay = items.length > 62 ? 's' : 'c'



    return { i: items, c: encodeNumbers(encodeWay, comparisons)};
  })
);

export const toStorageValue = state => {
  const smallState = getSmallState(state);

  return JSON.stringify(smallState);
};

const getLargeState = pipe(
  toPairs,
  map(([ratingListId, { i: items, c: code }]) => {
    let isGreaterDict = {};

    const c = decodeNumbers(code)

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

const checkDecodedNumbers = v(v.arrayOf(v.safeInteger))
const checkSmallState = v(
  {
    [v.rest]: {
      i: v.arrayOf(v.string),
      c: v.and(v.string, v.custom(pipe(decodeNumbers, checkDecodedNumbers)))
    }
  },
)

export const fromStorage = code => {
  const smallState = JSON.parse(code);
  const explanations = []

  if (!checkSmallState(smallState, explanations)) {
    console.log(explanations)
    throw Object.assign(new Error('Wrong format'), { explanations })
  }

  return getLargeState(smallState);
};
