import { useReducer } from "react";
import useSwr from "swr";
import {
  SearchState,
  SearchAction,
  SearchActionEnum,
} from "../interfaces/search.interface";

// constants
const API_URL = "https://api.github.com/search/repositories";
const MAX_PER_PAGE = 40;

// initial state for reducer
const initialState: SearchState = { searchKey: "", pageIndex: 1 };

/**
 * Reducer function
 */
function reducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionEnum.SET_SEARCH_KEY:
      // changing search key should reset the page index to 1
      return { searchKey: action.payload + "", pageIndex: 1 };
    case SearchActionEnum.SET_PAGE_INDEX:
      return { ...state, pageIndex: +action.payload };
    default:
      return state;
  }
}

/**
 * Fetcher function for swr
 */
async function fetcher(url: string) {
  return fetch(url).then((response) => response.json());
}

/**
 * Calling Github Search API using SWR
 * has caching and revalidation features
 * API is not called when search key is empty
 */
export default function useSearch() {
  const [searchState, dispatch] = useReducer(reducer, initialState);

  const queryString = encodeURIComponent(searchState.searchKey);
  const { data: repoList, isLoading } = useSwr(
    searchState.searchKey
      ? `${API_URL}?q=${queryString}&page=${searchState.pageIndex}&per_page=${MAX_PER_PAGE}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    searchState,
    dispatch,
    repoList,
    isLoading,
  };
}
