import { getSortedRating } from "./getSortedRating";

describe("getSortedRating", () => {
  const state = {
    rating: {
      items: ["b", "a"],
      isGreaterDict: {
        a: {
          b: false
        },
        b: {
          a: true
        }
      }
    }
  };
  test("Sorts items according to isGreaterDict", () => {
    expect(getSortedRating("rating")(state)).toEqual(["a", "b"]);
  });
});
