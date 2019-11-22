import { getSortedRating } from "./getSortedRating";

describe("getSortedRating", () => {
  const state = {
    items: ["b", "a"],
    isGreaterDict: {
      a: {
        b: false
      },
      b: {
        a: true
      }
    }
  };
  test("Sorts items according to isGreaterDict", () => {
    expect(getSortedRating(state)).toEqual(["a", "b"]);
  });
});
