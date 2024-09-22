declare global {
  namespace Cypress {
    /**
     * Custom command to fill post edit form
     * @example cy.fillPostForm(...)
     */
    interface Chainable {
      fillPostForm(
        title: string,
        body: string,
        userId: string,
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "fillPostForm",
  (title: string, body: string, userId: string) => {
    cy.get('input[name="title"]').clear().type(title);
    cy.get('textarea[name="body"]').clear().type(body);
    cy.get('select[name="userId"]').select(userId);
  },
);

export {};
