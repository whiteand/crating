import { reducer } from "./reducer";
import { addItem, addComparison, setRatingId } from "./actions";

describe("Store", () => {
  const initState = {
    items: [1, 2, 3],
    isGreaterDict: {},
    ratingId: null
  };
  test("Add Item at the beginning", () => {
    expect(reducer(initState, addItem(0, 0))).toEqual({
      ...initState,
      items: [0, 1, 2, 3]
    });
  });
  test("Add Item at the end", () => {
    expect(reducer(initState, addItem(0))).toEqual({
      ...initState,
      items: [1, 2, 3, 0]
    });
  });
  test("Add Item at the end", () => {
    expect(reducer(initState, addItem(0, 1))).toEqual({
      ...initState,
      items: [1, 0, 2, 3]
    });
  });

  test("Add comparison", () => {
    const action = addComparison("a", "b");
    const nextState = reducer(initState, action);
    expect(nextState).toEqual({
      ...initState,
      isGreaterDict: {
        a: {
          b: true
        },
        b: {
          a: false
        }
      }
    });
  });

  test("Add comparison overrides previous comparisons", () => {
    const initState = {
      isGreaterDict: {
        a: {
          b: true
        },
        b: {
          a: false
        }
      }
    };
    const action = addComparison("b", "a");
    const nextState = reducer(initState, action);
    expect(nextState).toEqual({
      ...initState,
      isGreaterDict: {
        a: {
          b: false
        },
        b: {
          a: true
        }
      }
    });
  });

  test("Set Rating Id", () => {
    const action = setRatingId("AndrewRating");
    const nextState = reducer(initState, action);
    expect(nextState).toEqual({
      ...initState,
      ratingId: "AndrewRating"
    });
  });
});
