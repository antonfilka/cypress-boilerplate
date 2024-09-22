import { REQUEST_ALIASES } from "../apiMocks";

class RequestChecker {
  alias: string;

  constructor(alias: string) {
    this.alias = alias;
  }

  // Method to wait for the request by alias
  waitForRequest() {
    return cy.wait(`@${this.alias}`);
  }

  // Method to check the request body
  toHaveBody(expectedBody: object) {
    this.waitForRequest().then((interception) => {
      expect(interception.request.body).to.deep.include(
        expectedBody,
        "Request body should match expected values",
      );
    });
    return this; // Returning `this` for chaining
  }

  // Method to check the query params in the request URL
  toHaveQuery(expectedQuery: object) {
    this.waitForRequest().then((interception) => {
      const requestUrl = new URL(interception.request.url);
      const queryParams = requestUrl.searchParams;

      if (Object.keys(expectedQuery).length === 0) {
        // If expectedQuery is an empty object, ensure there are no query parameters in the request
        expect([...queryParams.entries()]).to.have.length(
          0,
          "Request should have no query parameters",
        );
      } else {
        // Otherwise, check each expected query parameter
        Object.keys(expectedQuery).forEach((key) => {
          const actualValue = queryParams.get(key);
          expect(actualValue).to.eq(
            expectedQuery[key].toString(),
            `Query param ${key} should be ${expectedQuery[key]}`,
          );
        });
      }
    });
    return this; // Returning `this` for chaining
  }
}

export const checkRequest = (reqData: keyof typeof REQUEST_ALIASES) => {
  return new RequestChecker(REQUEST_ALIASES[reqData as string].alias);
};
