import { useSelector } from "./useSelector";

jest.mock("react", () => ({
  createContext: () => ({}),
  useContext: () => ({ state: { a: 1, b: 2 } }),
  useMemo: f => f()
}));

describe("Hooks: useSelector", () => {
  test("Calculates something depending on state", () => {
    expect(useSelector(({ a, b }) => a + b)).toEqual(3);
  });
});
