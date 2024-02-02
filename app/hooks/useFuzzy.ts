import {useMemo} from "react";
import FuzzySearch from "fuzzy-search";

function useFuzzy(
  list: any[],
  keys: string[],
  searchTerm: string = "",
  options: { caseSensitive: boolean; sort: boolean } = {
    caseSensitive: false,
    sort: true,
  },
  defaultEmpty: boolean = false
) {
  const fuse = useMemo(
    () => new FuzzySearch(list, keys, options),
    [list, keys, options]
  );

  const results = useMemo(
    () => fuse.search(searchTerm),
    [fuse, searchTerm]
  );

  return defaultEmpty && searchTerm == "" ? [] : results;
}

export default useFuzzy;
