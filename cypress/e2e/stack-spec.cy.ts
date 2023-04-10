import { SHORT_DELAY } from "../../src/consts/const";
import { ElementStates } from "../../src/types/element-states";
import { convertStrToRegexp } from "./utils";

describe('Проверка работы визуализатора стека', () => {
    beforeEach(() => {
        cy.visit('/stack');
    });

    describe('Проверка состояния кнопок и инпута', () => {
        it('Кнопка добавления заблокирована при пустом инпуте', () => {
            cy.get('input').should('have.value', '');
            cy.get('button[type=submit]').should('have.attr', 'disabled');
        });

        it('Кнопка добавления активна при заполненном инпуте', () => {
            cy.get('input').type('5').should('have.value', '5');
            cy.get('button[type=submit]').should('not.have.attr', 'disabled');
        });

        it('Кнопки удаления и очистки заблокированы при пустом стеке', () => {
            cy.get('[data-testid=delete-stack-item-btn]').should('have.attr', 'disabled');
            cy.get('[data-testid=clear-stack-btn]').should('have.attr', 'disabled');

            cy.get('input').type('5')
            cy.get('button[type=submit]').click();

            cy.get('[data-testid=delete-stack-item-btn]').should('not.have.attr', 'disabled');
            cy.get('[data-testid=clear-stack-btn]').should('not.have.attr', 'disabled');
        });

        it('В инпут можно ввести не более 4 символов', () => {
            cy.get('input').type('48597856').should('have.value', '4859');
        });

    });


    describe('Проверка логики добавления элемента в стек', () => {
        it('Добавление элемента в стек', () => {
            cy.get('[data-testid=circle-wrapper]').should('not.exist');

            cy.get('input').type('5').should('have.value', '5');
            cy.get('button[type=submit]').click();
            cy.get('button[type=submit] > img').should('exist');
            cy.get('input').should('have.value', '');

            cy.get('[data-testid=circle-wrapper]').each(item => {
                cy.wrap(item).contains('top').as('prevTopPointer');
                cy.wrap(item).contains('0');
                cy.wrap(item).contains('5');
            });

            cy.get('[data-testid=circle]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                }
            });

            cy.wait(SHORT_DELAY);

            cy.get('button[type=submit] > img').should('not.exist');

            cy.get('[data-testid=circle]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                }
            });

            cy.get('input').type('6').should('have.value', '6');
            cy.get('button[type=submit]').click();
            cy.get('button[type=submit] > img').should('exist');
            cy.get('input').should('have.value', '');

            cy.get('@prevTopPointer').should('not.exist');

            cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).contains('0');
                    cy.wrap(item).contains('5');
                }
                else {
                    cy.wrap(item).contains('top');
                    cy.wrap(item).contains('1');
                    cy.wrap(item).contains('6');
                }
            });

            cy.get('[data-testid=circle]').each((item, index) => {
                if (index === 1) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                }
            });

            cy.wait(SHORT_DELAY);
            cy.get('button[type=submit] > img').should('not.exist');

            cy.get('[data-testid=circle]').each((item) => {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
            });
        });
    });



    describe('Проверка логики работы кнопок "Удалить" и "Очистить"', () => {
        beforeEach(() => {
            cy.get('input').type('5').should('have.value', '5');
            cy.get('button[type=submit]').click();
            cy.wait(SHORT_DELAY)
            cy.get('input').type('6').should('have.value', '6');
            cy.get('button[type=submit]').click();
            cy.wait(SHORT_DELAY)
            cy.get('input').type('7').should('have.value', '7');
            cy.get('button[type=submit]').click();
            cy.wait(SHORT_DELAY)
            cy.get('[data-testid=circle-wrapper]').its('length').should('equal', 3);
        });


        it('Очистка стека', () => {
            cy.get('[data-testid=clear-stack-btn]').click();
            cy.get('[data-testid=circle-wrapper]').should('not.exist');
        });

        it('Удаление элемента из стека', () => {
            cy.get('[data-testid=delete-stack-item-btn]').click();
            cy.get('[data-testid=delete-stack-item-btn] > img').should('exist');

            cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                if (index === 1) {
                    cy.wrap(item).contains('top');
                    cy.wrap(item).contains('1');
                    cy.wrap(item).contains('6');
                    cy.get('[data-testid=circle]').each((item, index) => {
                        if (index === 1) {
                            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        }
                    });
                }

                else {
                    cy.wrap(item).contains('top').should('not.exist');
                    cy.wrap(item).contains(index === 1 ? '1' : '0');
                    cy.wrap(item).contains(index === 1 ? '6' : '5');
                    cy.get('[data-testid=circle]').each((item, index) => {
                        if (index === 0) {
                            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                        }
                    });

                }
            });

            cy.wait(SHORT_DELAY);

            cy.get('[data-testid=circle-wrapper]').its('length').should('equal', 2);
            cy.contains('7').should('not.exist');
            cy.get('[data-testid=delete-stack-item-btn] > img').should('not.exist');
        });

    });

});