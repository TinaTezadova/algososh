describe('Проверка работы визуализатора генератора числа Фибоначчи', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    });

    it('Кнопка генрации числа заблокирована при пустом инпуте', () => {
        cy.get('input').should('have.value', '');
        cy.get('button[type=submit]').should('have.attr', 'disabled');
    });

    it('Кнопка генрации числа активна при заполненном инпуте', () => {
        cy.get('input').type('8').should('have.value', '8');
        cy.get('button[type=submit]').click();
    });

    const checkElementsState = (requiredState: 'active' | 'disabled') => {
        const inputStateCondition = requiredState === 'disabled' ? 'have.attr' : 'not.have.attr';
        const loaderImgStateCondition = requiredState === 'disabled' ? 'exist' : 'not.exist';

        cy.get('input').should(inputStateCondition, 'disabled');
        cy.get('button[type=submit] > img').should(loaderImgStateCondition);
    };


    it('Проверить корректность генерации чисел', () => {
        const expectedResult = ['1', '1', '2', '3', '5', '8', '13', '21'];

        cy.get('input').type('7')
        cy.get('button[type=submit]').click();
        
        checkElementsState('disabled')

    
        cy.get('[data-testid=circle-text-value]').should('have.length', 8);
        cy.get('[data-testid=circle-text-value]').then(items => {
          const array = items.map((_, el) => el.textContent);
    
          expect(array.get()).to.deep.equal(expectedResult);
        });
    
        checkElementsState('active')
      });

});