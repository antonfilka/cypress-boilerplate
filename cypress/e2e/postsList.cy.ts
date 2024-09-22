import { REQUEST_ALIASES, mockApi } from "../apiMocks";
import * as POSTS_RESPONSE from "../apiMocks/posts.json";
import { checkRequest } from "../utils/requestUtils";

describe("Posts List Page", () => {
  it("should display a list of posts", () => {
    mockApi.mock("GET_POSTS", POSTS_RESPONSE);

    cy.visit("/posts");
    cy.wait(mockApi.getAlias("GET_POSTS"));

    // Verify the posts are displayed
    POSTS_RESPONSE.forEach((post) => {
      cy.get("h2").contains(post.title).should("be.visible");
      cy.get("p").contains(post.body).should("be.visible");
    });
  });

  it("should filter posts based on search term", () => {
    const postTitleToSearch = "Post from Mike in Twitter";
    const postBodyToSearch = "Body of Mike's post";

    mockApi.mock("GET_POSTS", POSTS_RESPONSE);
    mockApi.mock("GET_POSTS_FILTER", [
      { id: 2, title: postTitleToSearch, body: postBodyToSearch },
    ]);

    cy.visit("/posts");

    checkRequest("GET_POSTS").toHaveQuery({});

    cy.get("input:first").click().type(postTitleToSearch);

    checkRequest("GET_POSTS_FILTER").toHaveQuery({
      q: postTitleToSearch,
    });

    // Verify the filtered result
    cy.get("h2").contains(postTitleToSearch).should("be.visible");
    cy.get("p").contains(postBodyToSearch).should("be.visible");
    cy.get("h2").contains("Post 1").should("not.exist");
    cy.get("h2").contains("Post 3").should("not.exist");

    cy.get("input:first").click().clear();

    checkRequest("GET_POSTS").toHaveQuery({});

    // Verify the posts are displayed
    POSTS_RESPONSE.forEach((post) => {
      cy.get("h2").contains(post.title).should("be.visible");
      cy.get("p").contains(post.body).should("be.visible");
    });
  });
});
