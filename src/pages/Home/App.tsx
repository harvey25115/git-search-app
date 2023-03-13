import { useEffect, useState } from "react";
import "./App.css";
import RepoInfo from "../../interfaces/repo-info.interface";
import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";
import useSearch from "../../hooks/useSearch";
import useThrottle from "../../hooks/useThrottle";

/**
 * Home page screen
 * displays the search input and all repositories found.
 */
export default function App() {
  // search input state
  const [searchInput, setSearchInput] = useState("");
  // use custom hooks
  const { repoList, isLoading, searchState, dispatch } = useSearch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchState.pageIndex]);

  // throttle function
  const throttleFunc = useThrottle();

  // event handlers
  // form submit event
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    throttleFunc(
      dispatch.bind(null, { type: "setSearchKey", payload: searchInput })
    );
  };

  // input change event
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // go to specific page event
  const goToPageHandler = (pageIndex: number) => {
    throttleFunc(
      dispatch.bind(null, { type: "setPageIndex", payload: pageIndex })
    );
  };

  let dataList = [];
  let resultCount = 0;
  if (repoList && repoList.items) {
    resultCount = repoList.total_count;
    dataList = repoList.items.map((repoInfo: RepoInfo) => {
      return <Card key={repoInfo.id} repoInfo={repoInfo} />;
    });
  }

  // sets the search results detail
  let resultString = searchState.searchKey
    ? `Results (${resultCount} found)`
    : "Search for repository in the search field.";

  return (
    <main className="main">
      <div className="search-container">
        <form onSubmit={submitHandler} className="input-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={changeHandler}
            />
          </div>
        </form>
        <section className="result-section">
          <header className="section-header">
            {/* loading suspense */}
            {isLoading ? "Loading results..." : resultString}
          </header>
          <div className="card-container">
            {/* display result when search key has value */}
            {searchState.searchKey ? dataList : ""}
          </div>
        </section>
        <section className="page-section">
          {/* display page when search key has value */}
          {searchState.searchKey ? (
            <Page
              resultCount={resultCount}
              currentPage={searchState.pageIndex}
              setPage={goToPageHandler}
            />
          ) : (
            ""
          )}
        </section>
      </div>
    </main>
  );
}
