Cypress.Commands.add('signup', (username, password) => {
  username = username || 'user';
  password = password || 'password';
  cy
    .visit('/signup')
    .url().should('include', '/signup')
    .get('#username').type(username)
    .get('#password').type(password)
    .get('#BBQ').click()
    .get('#form').submit()
    .url().should('include', '/dashboard');
});
