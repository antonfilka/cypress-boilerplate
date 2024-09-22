import { REQUEST_ALIASES, mockApi } from "../apiMocks";
import { checkRequest } from "../utils/requestUtils";

describe("Edit Post Page", () => {
  const post = { id: 1, title: "Test Post", body: "Test Body" };
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Smith" },
  ];

  it("should display post details in the form and submit updates", () => {
    // Mock the API responses for the post and users
    mockApi.mock("GET_POST", post);
    mockApi.mock("GET_USERS", users);

    // Visit the edit post page
    cy.visit(`/edit/${post.id}`);
    cy.wait(mockApi.getAlias("GET_POST"));
    cy.wait(mockApi.getAlias("GET_USERS"));

    // Verify the form fields are populated correctly
    cy.get('input[name="title"]').should("have.value", post.title);
    cy.get('textarea[name="body"]').should("have.value", post.body);
    // TODO: Reach MUI select
    cy.get('select[name="userId"]').should("not.have.value", undefined);

    // Fill out the form with updated values
    cy.get('input[name="title"]').clear().type("Updated Title");
    cy.get('textarea[name="body"]').clear().type("Updated Body");
    // TODO: Reach MUI select
    cy.get('select[name="userId"]').select("2");

    // Mock the API POST request for updating the post
    const updatedPost = {
      title: "Updated Title",
      body: "Updated Body",
      userId: 2,
    };
    mockApi.mock("CREATE_POST", { ...updatedPost, id: post.id });

    cy.get('button[type="submit"]').click();

    checkRequest("CREATE_POST").toHaveBody(updatedPost);

    cy.url().should("include", "/posts");
  });
});
