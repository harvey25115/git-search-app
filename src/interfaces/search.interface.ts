// search state interface
export interface SearchState {
  searchKey: string;
  pageIndex: number;
}

// search enum
export enum SearchActionEnum {
  SET_SEARCH_KEY = "setSearchKey",
  SET_PAGE_INDEX = "setPageIndex",
}

// search action interface
export interface SearchAction {
  type: "setSearchKey" | "setPageIndex";
  payload: number | string;
}
