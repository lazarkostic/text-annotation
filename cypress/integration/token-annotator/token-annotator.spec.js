it('Labels a token', () => {
  cy.visit('http://localhost:3000');
  // Click token "Gregor"
  cy.contains('Gregor').click().as('token');
  // Expect token to have tag PERSON
  cy.get('@token')
    .children()
    .each(($el) => {
      cy.get($el).contains('PERSON');
    });
});
