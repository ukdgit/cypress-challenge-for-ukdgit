
Cypress.Commands.add('getUserLogin', () => {
    const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const d = new Date();
    cy.get('[data-test-id=signup-email]')
        .type('ukdgit-' + month[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear()
            + '-' + d.getHours() + d.getMinutes() + '-' + d.getMilliseconds() + '@example.com')
    cy.get('[data-test-id=signup-submit]').click()

})

Cypress.Commands.add('getWrongUserLogin', () => {
    const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const d = new Date();
    cy.get('[data-test-id=signup-email]')
        .type('ukdgit-' + month[d.getMonth()] + '-' + d.getDate() + '-' + d.getFullYear()
            + '-' + d.getHours() + d.getMinutes() + '-' + d.getMilliseconds())
    cy.get('[data-test-id=signup-submit]').click()

})

