Cypress.Commands.add('getByCy', (selector, ...args) =>
	cy.get(`[data-cy="${selector}"]`, ...args)
);
