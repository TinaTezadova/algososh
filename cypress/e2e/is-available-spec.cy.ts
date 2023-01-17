describe('Проверка доступности приложения', () => {
  it('Приложение доступно по адресу localhost:3000', () => {
    cy.visit('/');
    cy.get('main').should('exist');
  });
});