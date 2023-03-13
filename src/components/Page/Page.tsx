import "./Page.css";
import { PageInfo } from "../../interfaces/page-info.interface";

// constants
const MAX_ITEMS_PER_PAGE = 25;
const MAX_REPOS = 1000;
const MAX_PAGE_SIZE = 5;

/**
 * Pagination component
 * create pagination based from result count
 * sets the current page
 * move to specific page
 */
export default function Page({ resultCount, currentPage, setPage }: PageInfo) {
  // constructing page list
  let pageCount = 0;
  if (resultCount) {
    if (resultCount > MAX_REPOS) {
      // if repoCount is more than 1000 (github can accomodate 1000 results)
      pageCount = Math.trunc(MAX_REPOS / MAX_ITEMS_PER_PAGE);
    } else {
      pageCount = Math.trunc(resultCount / MAX_ITEMS_PER_PAGE);
    }
  }

  const pageList = new Array(pageCount).fill(1).map((page, index) => {
    let pageItem = page + index;
    let isSelected = currentPage === pageItem;
    return (
      <li
        className={isSelected ? "selected" : ""}
        onClick={() => setPage(pageItem)}
        key={`page${index}`}
      >
        {pageItem}
      </li>
    );
  });

  let max = Math.ceil(currentPage / MAX_PAGE_SIZE) * MAX_PAGE_SIZE;
  let min = max - MAX_PAGE_SIZE;

  // event handlers
  // go to previous page
  const goToPrevPage = () => {
    if (currentPage - 1) {
      setPage(currentPage - 1);
    }
  };

  // go to next page
  const goToNextPage = () => {
    if (currentPage + 1 < pageCount) {
      setPage(currentPage + 1);
    }
  };

  // not rendered if pageCount is 0
  return pageCount ? (
    <ul className="page-container">
      <li onClick={goToPrevPage}>
        <img src="/icons8-back-48.png" alt="Previous" className="page-icon" />
      </li>
      {/* render page */}
      {pageList.slice(min, max)}
      <li onClick={goToNextPage}>
        <img src="/icons8-forward-48.png" alt="Next" className="page-icon" />
      </li>
    </ul>
  ) : null;
}
