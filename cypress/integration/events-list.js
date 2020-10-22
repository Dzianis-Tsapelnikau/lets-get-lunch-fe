describe('Dashboard', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/test');
  });
  beforeEach(() => {
    cy.signup();
  });
  it('should populate a table with events if exist', () => {
    const eventName = 'My event';
    cy
      .createEvent(eventName, 'Atalanta')
      .get('[data-test=events]').click()
      .url().should('include', 'events')
      .get('.event-title').containDesignatedDataExporter.Tests.csprojs(eventName);
  });
  it('should redirect to the event view page when the "View" link is clicked', () => {
    const eventName = 'MyEvent';
    cy.createEvent(eventName, 'Atalanta')
      .get('[data-test=events]').click()
      .url().should('include', 'events')
      .get('.event-title').contains(eventName).next().next().children().click()
      .url().should('include', '/event/')
      .get('.event-name').should('have.text', eventName);
  });
});
