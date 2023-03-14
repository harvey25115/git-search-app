/// <reference types="cypress" />
/**
 * Request object for stub
 */
const API_URL_OBJECT = {
  method: "GET",
  hostname: "api.github.com",
  pathname: "/search/repositories",
};

/**
 * Delay time for throttling
 */
const DELAY = 6000;

/**
 * Setting response data for test
 */
function setResponseStub(
  searchKey: string,
  stubFile?: string,
  pageIndex: string = "1"
) {
  let stub = {};
  if (stubFile) {
    stub = { fixture: stubFile };
  }
  return cy.intercept(
    {
      ...API_URL_OBJECT,
      query: {
        q: searchKey,
        page: pageIndex,
        per_page: "40",
      },
    },
    stub
  );
}

/**
 * Search function test
 */
describe("E2E Testing: Git Search App: search function", () => {
  it("should display results without pagination when result is less than 40", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("nextnext", "data-1.json");
    // action
    cy.get(".search-input").type("nextnext{enter}");
    // assertion
    cy.get(".section-header").should("include.text", "23");
    cy.get(".card").should("have.length", 23);
    cy.get(".page-container").should("not.exist");
  });
  it("should display results with pagination when result is more than 40", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("program1", "data-2.json");
    // action
    cy.get(".search-input").type("program1{enter}");
    // assertion
    cy.get(".section-header").should("include.text", "2373");
    cy.get(".card").should("have.length", 40);
    cy.get(".page-container").should("exist");
  });
  it("should not display results when no result is found", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("testxx");
    // action
    cy.get(".search-input").type("testxx{enter}");
    // assertion
    cy.get(".section-header").should("include.text", "0");
    cy.get(".card").should("not.exist");
    cy.get(".page-container").should("not.exist");
  });
});

/**
 * Page function test
 */
describe("E2E Testing: Git Search App: page function", () => {
  it("should go to the next page when next button is clicked", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-1.json").as("getInitialData");
    setResponseStub("random1", "page-2.json", "2").as("getNextPageData");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click next button
    cy.get(".next").click();
    // assertion
    cy.wait("@getNextPageData");
    cy.get(".card").should("have.length", 40);
    cy.get(".selected").should("have.text", "2");
  });
  it("should go to the previous page when previous button is clicked", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-1.json").as("getInitialData");
    setResponseStub("random1", "page-2.json", "2").as("getNextPageData");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click next button
    cy.get(".next").click();
    cy.wait("@getNextPageData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click previous button
    cy.get(".previous").click();
    // assertion
    cy.wait("@getInitialData");
    cy.get(".card").should("have.length", 40);
    cy.get(".selected").should("have.text", "1");
  });
  it("should go to the specific page when page number is clicked", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-1.json").as("getInitialData");
    setResponseStub("random1", "page-2.json", "5").as("getNextPageData");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click page 5
    cy.get(".page-container").contains("5").click();
    // assertion
    cy.wait("@getNextPageData");
    cy.get(".card").should("have.length", 40);
    cy.get(".selected").should("have.text", "5");
  });
  it("should not display the previous button in first page", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-1.json").as("getInitialData");
    // action
    cy.get(".search-input").type("random1{enter}");
    // assertion
    cy.get(".previous").should("not.be.visible");
  });
  it("should not display the next button in last page", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-max.json").as("getInitialData");
    setResponseStub("random1", "page-max.json", "5").as("getLastPageData");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click page 5
    cy.get(".page-container").contains("5").click();
    // assertion
    cy.wait("@getLastPageData");
    cy.get(".section-header").should("include.text", "200");
    cy.get(".next").should("not.be.visible");
  });
  it("should display the next page number sequence after clicking the next page", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-multiple.json").as("getInitialData");
    setResponseStub("random1", "page-multiple.json", "5").as("getPage5Data");
    setResponseStub("random1", "page-multiple.json", "6").as("getPage6Data");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click last current page (5)
    cy.get(".page-container").contains("5").click();
    cy.wait("@getPage5Data");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click next page (6)
    cy.get(".next").click();
    // assertion
    cy.wait("@getPage6Data");
    cy.get(".selected").should("have.text", "6");
    cy.get(".page-container").children().eq(5).should("have.text", "10");
  });
  it("should display the previous page number sequence after clicking the previous page", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-multiple.json").as("getInitialData");
    setResponseStub("random1", "page-multiple.json", "5").as("getPage5Data");
    setResponseStub("random1", "page-multiple.json", "6").as("getPage6Data");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@getInitialData");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click last current page (5)
    cy.get(".page-container").contains("5").click();
    cy.wait("@getPage5Data");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click next page (6)
    cy.get(".next").click();
    cy.wait("@getPage6Data");
    cy.wait(DELAY); // wait for 6 secs due to throttling
    // click previous page (5)
    cy.get(".previous").click();
    // assertion
    cy.wait("@getPage5Data");
    cy.get(".selected").should("have.text", "5");
    cy.get(".page-container").children().eq(1).should("have.text", "1");
  });
});

/**
 * Throttle function test
 */
describe("E2E Testing: Git Search App: throttle function", () => {
  it("should not call the search event within 6 seconds of the previous API call", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("nextnext", "data-1.json").as("firstCall");
    setResponseStub("test", "data-2.json").as("secondCall");
    // action
    cy.get(".search-input").type("nextnext{enter}");
    cy.wait("@firstCall");
    cy.get(".section-header").invoke("text").as("previousState");
    cy.get(".search-input").clear().type("test{enter}");
    // assertion
    // assert header is still the same
    cy.get(".section-header").then((newState) => {
      const newText = newState.text();
      cy.get("@previousState").should("be.equal", newText);
    });
  });
  it("should not call the page event within 6 seconds of the previous API call", () => {
    cy.visit("/");
    // setting stub response
    setResponseStub("random1", "page-1.json").as("firstCall");
    setResponseStub("random1", "page-2.json", "2").as("secondCall");
    // action
    cy.get(".search-input").type("random1{enter}");
    cy.wait("@firstCall");
    cy.get(".section-header").invoke("text").as("previousState");
    cy.get(".next").click();
    // assertion
    // assert header is still the same
    cy.get(".section-header").then((newState) => {
      const newText = newState.text();
      cy.get("@previousState").should("be.equal", newText);
    });
  });
});
