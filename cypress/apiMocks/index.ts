const BASE_URL = "https://jsonplaceholder.typicode.com";

export type RequestData = {
  alias: string;
  url: string;
  type: "GET" | "POST" | "PUT" | "DELETE";
};

export const REQUEST_ALIASES = {
  GET_POSTS: {
    alias: "getPosts",
    url: `${BASE_URL}/posts`,
    type: "GET",
  } as RequestData,
  GET_POSTS_FILTER: {
    alias: "getPostsFilter",
    url: `${BASE_URL}/posts?q=*`,
    type: "GET",
  } as RequestData,
  GET_POST: {
    alias: "getPost",
    url: `${BASE_URL}/posts/*`,
    type: "GET",
  } as RequestData,
  CREATE_POST: {
    alias: "postPost",
    url: `${BASE_URL}/posts`,
    type: "POST",
  } as RequestData,
  GET_USERS: {
    alias: "getUsers",
    url: `${BASE_URL}/users`,
    type: "GET",
  } as RequestData,
};

class MockApi {
  private requestAliases: Record<string, RequestData>;

  constructor(requestAliases: Record<string, RequestData>) {
    this.requestAliases = requestAliases;
  }

  getAlias(endpoint: keyof typeof REQUEST_ALIASES): string {
    return `@${this.requestAliases[endpoint].alias}`;
  }

  // Method to mock API request for the given endpoint
  mock(endpoint: keyof typeof REQUEST_ALIASES, mockData: any) {
    const reqData = this.requestAliases[endpoint];
    cy.intercept(reqData.type, reqData.url, {
      statusCode: 200,
      body: mockData,
    }).as(reqData.alias);
  }
}

export const mockApi = new MockApi(REQUEST_ALIASES);
