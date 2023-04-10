import { SHORT_DELAY } from "../../src/consts/const";
import { ElementStates } from "../../src/types/element-states";
import { convertStrToRegexp } from "./utils";

describe('Проверка работы визуализатора стека', () => {
    beforeEach(() => {
        cy.visit('/queue');
    });

    describe('Проверка состояния кнопок и инпута', () => {
        it('Кнопка добавления заблокирована при пустом инпуте', () => {
            cy.get('input').should('have.value', '');
            cy.get('button[type=submit]').should('have.attr', 'disabled');
        });

        it('Кнопка добавления активна при заполненном инпуте', () => {
            cy.get('input').type('1').should('have.value', '1');
            cy.get('button[type=submit]').should('not.have.attr', 'disabled');
        });

        it('Кнопки удаления и очистки заблокированы если пустая очередь', () => {
            cy.get('[data-testid=circle-text-value]').then(item => {
                const QueueIsEmpty = Array.from(item.get()).every(el => el.textContent === '');
                cy.wrap(QueueIsEmpty).should('be.true');
            });

            cy.get('[data-testid=delete-queue-item-btn]').should('have.attr', 'disabled');
            cy.get('[data-testid=clear-queue-btn]').should('have.attr', 'disabled');

            cy.get('input').type('2')
            cy.get('button[type=submit]').click();

            cy.get('[data-testid=delete-queue-item-btn]').should('not.have.attr', 'disabled');
            cy.get('[data-testid=clear-queue-btn]').should('not.have.attr', 'disabled');
        });

        it('В инпут можно ввести не более 4 символов', () => {
            cy.get('input').type('48597856').should('have.value', '4859');
        });

    });


        describe('Проверка логики добавления элемента в очередь', () => {
            it('Добавление элемента в стек', () => {
                cy.get('[data-testid=circle-text-value]').then(item => {
                    const QueueIsEmpty = Array.from(item.get()).every(el => el.textContent === '');
                    cy.wrap(QueueIsEmpty).should('be.true');
                });

                cy.get('input').type('1').should('have.value', '1');
                cy.get('button[type=submit]').click();
                cy.get('button[type=submit] > img').should('exist');
                cy.get('input').should('have.value', '');

                cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                    cy.get('[data-testid=circle]').each((el, idx) => {
                        if (index === 0 && idx === 0) {
                            cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        }
                    });
                    cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.value', '');
                    cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.value', '');
                    cy.wrap(item).find('[data-testid=circle-text-value]').should('have.value', '');
                });

                cy.wait(SHORT_DELAY);
                cy.get('button[type=submit] > img').should('not.exist');

                cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                    if (index === 0) {
                        cy.wrap(item).contains('tail');
                        cy.wrap(item).contains('head');
                        cy.wrap(item).contains('1');
                    }
                    else {
                        cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-text-value]').should('have.value', '');
                    }

                });

                cy.get('[data-testid=circle]').each((item) => {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                });


                cy.get('input').type('2').should('have.value', '2');
                cy.get('button[type=submit]').click();
                cy.get('button[type=submit] > img').should('exist');
                cy.get('input').should('have.value', '');

                cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                    if (index === 0) {
                        cy.wrap(item).contains('tail').should('not.exist');
                        cy.wrap(item).contains('head');
                        cy.wrap(item).contains('1');
                    }
                    else if (index === 1) {
                        cy.wrap(item).contains('tail');
                        cy.wrap(item).contains('head').should('not.exist');
                        cy.wrap(item).contains('2');
                        cy.get('[data-testid=circle]').each((el, idx) => {
                            if (idx === 1) {
                                cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                            }
                        });
                    }
                    else {
                        cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-text-value]').should('have.value', '');
                        cy.get('[data-testid=circle]').each((el, idx) => {
                            if (idx === index) {
                                cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                            }
                        });
                    }

                });

                cy.wait(SHORT_DELAY);
                cy.get('button[type=submit] > img').should('not.exist');

                cy.get('[data-testid=circle-text-value]').then(items => {
                    const filtredArray = items.toArray().filter(elem => elem.textContent !== '');
                    cy.wrap(filtredArray.length).should('equal', 2)
                })
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
                cy.get('[data-testid=circle-text-value]').then(items => {
                    const filtredArray = items.toArray().filter(elem => elem.textContent !== '');
                    cy.wrap(filtredArray.length).should('equal', 2)
                })
            });


            it('Очистка стека', () => {
                cy.get('[data-testid=clear-queue-btn]').click();
                cy.get('[data-testid=circle-text-value]').then(items => {
                    const filtredArray = items.toArray().filter(elem => elem.textContent !== '');
                    cy.wrap(filtredArray.length).should('equal', 0)
                })
            });

            it('Удаление элемента из стека', () => {
                cy.get('[data-testid=delete-queue-item-btn]').click();
                cy.get('[data-testid=delete-queue-item-btn] > img').should('exist');

                cy.get('[data-testid=circle]').each((item, index) => {
                    if (index === 0) {
                        cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                    }
                });

                cy.wait(SHORT_DELAY);


                cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                    if (index === 0) {
                        cy.wrap(item).contains('tail').should('not.exist');
                        cy.wrap(item).contains('head').should('not.exist');
                        cy.wrap(item).contains('6').should('not.exist');

                    }
                    else if (index === 1) {
                        cy.wrap(item).contains('tail');
                        cy.wrap(item).contains('head');
                        cy.wrap(item).contains('6');
                        cy.get('[data-testid=circle]').each((item, index) => {
                            if (index === 0) {
                                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                            }
                        });
                    }

                    else {
                        cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.value', '');
                        cy.wrap(item).find('[data-testid=circle-text-value]').should('have.value', '');
                        cy.get('[data-testid=circle]').each((el, idx) => {
                            if (idx === index) {
                                cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                            }
                        });

                    }
                });

                cy.wait(SHORT_DELAY);

                cy.get('[data-testid=circle-text-value]').then(items => {
                    const filtredArray = items.toArray().filter(elem => elem.textContent !== '');
                    cy.wrap(filtredArray.length).should('equal', 1)
                })
                cy.get('[data-testid=delete-queue-item-btn] > img').should('not.exist');
            });

        });

    




});