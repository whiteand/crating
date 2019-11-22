import { useDispatch } from "./useDispatch";

jest.mock("react", () => ({
  useContext: () => ({ dispatch: 1 }),
  createContext: () => null
}));

describe("Hooks: useDispatch", () => {
  test("returns dispatch from context", () => {
    expect(useDispatch()).toEqual(1);
  });
});
