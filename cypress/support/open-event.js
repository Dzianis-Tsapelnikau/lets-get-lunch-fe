Cypress.Commands.add('openEvent',(name)=>{
  cy
    .get('.cal-event .cal-event-title').should('have.text',name).click()
    .url().should('include','/event/')
    .get('.event-name').should('have.text', name);
})
