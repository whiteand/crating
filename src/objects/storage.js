import { propOr, pipe, toPairs, map, join, filter } from "ramda";
const defaultTest = json => {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return false;
  }
};

const parseQuery = queryString =>
  (queryString[0] === "?" ? queryString.substr(1) : queryString)
    .split("&")
    .reduce((query, pair) => {
      const [prop, propValue] = pair.split("=");
      query[decodeURIComponent(prop)] = decodeURIComponent(propValue || "");
      return query;
    }, {});

const getFromLocalStorage = key => localStorage.getItem(key);

const getFromUrl = key => propOr(null, key, parseQuery(window.location.search));

export const storage = {
  getItem(key, test = defaultTest) {
    const fromLocalStorage = getFromLocalStorage(key);
    const fromUrl = getFromUrl(key);

    if (!test(fromUrl)) return fromLocalStorage;
    if (!test(fromLocalStorage)) return fromUrl;

    return fromUrl || fromLocalStorage;
  },
  setItem(key, value) {
    window.localStorage.setItem(key, value);
    const currentQuery = parseQuery(window.location.search);
    currentQuery[key] = value;
    const newSearch = `?${pipe(
      toPairs,
      filter(([key, value]) => key && value),
      map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      ),
      join("&")
    )(currentQuery)}`;
    const newUrl = `${window.location.origin}/${newSearch}`;
    window.history.pushState({}, null, newUrl);
  }
};
