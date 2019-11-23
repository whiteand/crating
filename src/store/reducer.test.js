import { reducer } from "./reducer";
import {
  addItem,
  addComparison,
  createRatingList,
  removeItem,
  removeRatingList,
  removeComparison
} from "./actions";

describe("Store", () => {
  test("Create Rating List", () => {
    const initialState = {};
    const actions = [createRatingList("testRatingList")];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: [],
        ratingListId: "testRatingList",
        isGreaterDict: {}
      }
    });
  });

  test("Add Rating List Item", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0)
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "a", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {}
      }
    });
  });

  test("Add Comparison", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b")
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "a", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          a: {
            b: true
          },
          b: {
            a: false
          }
        }
      }
    });
  });
  test("Add Comparison overrides previous", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      addComparison("testRatingList", "b", "a")
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "a", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          a: {
            b: false
          },
          b: {
            a: true
          }
        }
      }
    });
  });
  test("Remove comparison", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      removeComparison("testRatingList", "a")
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "a", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          b: {}
        }
      }
    });
  });

  test("Remove comparison", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      removeComparison("testRatingList", "a", "b")
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "a", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          a: {},
          b: {}
        }
      }
    });
  });

  test("Remove Item", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      addComparison("testRatingList", "b", "a"),
      removeItem("testRatingList", "a")
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          a: {
            b: false
          },
          b: {
            a: true
          }
        }
      }
    });
  });
  test("Remove Item with comparisons", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      addComparison("testRatingList", "b", "a"),
      removeItem("testRatingList", "a", true)
    ];
    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );
    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "b", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {
          b: {}
        }
      }
    });
  });
  test("Remove all items", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      addComparison("testRatingList", "b", "a"),
      removeItem("testRatingList", "a", true),
      removeItem("testRatingList", "b", true)
    ];

    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );

    expect(nextState).toEqual({
      testRatingList: {
        items: ["d", "c"],
        ratingListId: "testRatingList",
        isGreaterDict: {}
      }
    });
  });
  test("Remove rating list", () => {
    const initialState = {};
    const actions = [
      createRatingList("testRatingList"),
      addItem("testRatingList", "a"),
      addItem("testRatingList", "b"),
      addItem("testRatingList", "c"),
      addItem("testRatingList", "d", 0),
      addComparison("testRatingList", "a", "b"),
      addComparison("testRatingList", "b", "a"),
      removeItem("testRatingList", "a", true),
      removeItem("testRatingList", "b", true),
      removeRatingList("testRatingList")
    ];

    const nextState = actions.reduce(
      (state, action) => reducer(state, action),
      initialState
    );

    expect(nextState).toEqual({});
  });
});
