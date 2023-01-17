import { DELAY } from "../../src/consts/const";
import { ElementStates } from "../../src/types/element-states";
import { convertStrToRegexp } from "./utils";

describe('Проверка работы визуализатора "Cвязанный список"', () => {
    beforeEach(() => {
        cy.visit('/list');
    });

    describe('Проверка состояния кнопок и инпута', () => {
        it('Кнопки добавления в tail и head заблокированы при пустом инпуте', () => {
            cy.get('[data-testid=value-input]').should('have.value', '');
            cy.get('[data-testid=add-to-head-btn]').should('have.attr', 'disabled');
            cy.get('[data-testid=add-to-tail-btn]').should('have.attr', 'disabled');
        });

        it('Кнопки добавления в tail и head активны при заполненном инпуте', () => {
            cy.get('[data-testid=value-input]').type('1').should('have.value', '1');
            cy.get('[data-testid=add-to-head-btn]').should('not.have.attr', 'disabled');
            cy.get('[data-testid=add-to-tail-btn]').should('not.have.attr', 'disabled');
        });

        it('Кнопки добавления и удаления по индексу заблокированы при пустом инпуте', () => {
            cy.get('[data-testid=value-input]').should('have.value', '');
            cy.get('[data-testid=index-input]').should('have.value', '');
            cy.get('[data-testid=add-by-index-btn]').should('have.attr', 'disabled');
            cy.get('[data-testid=delete-by-index-btn]').should('have.attr', 'disabled');
        });

        it('Кнопки добавления и удаления по индексу активны при заполненном инпуте', () => {
            cy.get('[data-testid=value-input]').type('1').should('have.value', '1');
            cy.get('input[type="number"]').type('0').trigger('change');
            cy.get('[data-testid=add-by-index-btn]').should('not.have.attr', 'disabled');
            cy.get('[data-testid=delete-by-index-btn]').should('not.have.attr', 'disabled');
        });


        it('В инпут можно ввести не более 4 символов', () => {
            cy.get('[data-testid=value-input]').type('85965478').should('have.value', '8596');
        });

    });


    describe('Дефолтный список', () => {
        it('Проверка корректности вывода дефолтного связанного списка', () => {

            cy.get('[data-testid=circle]').each((item) => {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                items.toArray().every(elem => elem.textContent !== '');
            });

            cy.get('[data-testid=circle-wrapper]').each((item, index, array) => {
                cy.wrap(item).find('[data-testid=circle-index-value]').should('have.text', String(index));
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.text', 'head');
                }
                else if (index === array.length - 1) {
                    cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.text', 'tail');
                }
                else {
                    cy.wrap(item).find('[data-testid=circle-head-pointer]').should('have.text', '');
                    cy.wrap(item).find('[data-testid=circle-tail-pointer]').should('have.text', '');
                }
            });
        });
    });


    describe('Добавление элемента в список', () => {
        it('Добавление нового элемента в head', () => {
            let initialListLength: number;
            cy.get('[data-testid=circle-text-value]').then(items => {
                initialListLength = items.toArray().length
            });
            cy.get('[data-testid=value-input]').type('11');
            cy.get('[data-testid=add-to-head-btn]').click();
            cy.get('[data-testid=add-to-head-btn] > img').should('exist');
            cy.get('[data-testid=circle-head-pointer]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle]').each((item) => {
                        cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(item[0]).contains('11');
                    })
                }


            });

            cy.wait(DELAY);

            cy.get('[data-testid=circle]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
                }
                else {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                }

            })

            cy.get('[data-testid=circle-wrapper]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).contains('11');
                }
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength + 1)
            });

            cy.get('[data-testid=add-to-head-btn] > img').should('not.exist');


        });

        it('Добавление нового элемента в tail', () => {
            let initialListLength: number;
            cy.get('[data-testid=circle-text-value]').then(items => {
                initialListLength = items.toArray().length
            });
            cy.get('[data-testid=value-input]').type('15');
            cy.get('[data-testid=add-to-tail-btn]').click();
            cy.get('[data-testid=add-to-tail-btn] > img').should('exist');

            cy.get('[data-testid=circle-small-wrapper]').each((item) => {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains('15');
                    })


            });

            cy.wait(DELAY);

            cy.get('[data-testid=circle]').each((item, index, array) => {
                if (index === array.length - 1) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
                }
                else {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
                }

            })

            cy.get('[data-testid=circle-wrapper]').each((item, index, array) => {
                if (index === array.length - 1) {
                    cy.wrap(item).contains('15');
                }
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength + 1)
            });

            cy.get('[data-testid=add-to-tail-btn] > img').should('not.exist');


        });

        it('Добавление нового элемента по индексу', () => {
            let initialListLength: number;
            cy.get('[data-testid=circle-text-value]').then(items => {
                initialListLength = items.toArray().length
            });
            cy.get('[data-testid=value-input]').type('2');
            cy.get('[data-testid=add-to-tail-btn]').click();
            cy.get('[data-testid=value-input]').type('3');
            cy.get('input[type="number"]').type('1').trigger('change');
            cy.get('[data-testid=add-by-index-btn]').click();
            cy.wait(1);
            cy.get('[data-testid=circle-head-pointer]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains('3');
                    })
                }

            });
            cy.get('[data-testid=add-by-index-btn] > img').should('exist');

            cy.wait(DELAY);

            cy.get('[data-testid=circle-head-pointer]').each((item, index) => {
                if (index === 1) {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains('3');
                    })
                }

            });
            cy.wait(DELAY);


            cy.get('[data-testid=circle]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                }
                if (index === 1) {
                    cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
                    cy.wrap(item[0]).contains('3');
                }
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength + 2)
            });

            cy.get('[data-testid=add-by-index-btn] > img').should('exist');

        });
    });


    describe('Удаление элемента из списка', () => {
        it('Удаление элемента из head', () => {
            let initialListLength: number = 1;
            let headItemValue: string;
            cy.get('[data-testid=circle-text-value]').then(items => {
                const arr = items.toArray()
                initialListLength += arr.length;
                arr.forEach((el, index) => {
                    if(index === 0) {
                        headItemValue = el.textContent || ''
                    }
                })
            });

            cy.get('[data-testid=value-input]').type(`111115`);
            cy.get('[data-testid=add-to-tail-btn]').click();
            cy.wait(DELAY);
            cy.get('[data-testid=delete-from-head-btn]').click();
            cy.get('[data-testid=delete-from-head-btn] > img').should('exist');


            cy.get('[data-testid=circle-text-value]').then(items => {
                const filtredArray = items.toArray().filter(elem => elem.textContent !== '' && elem.textContent!== headItemValue);
                cy.wrap(filtredArray.length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=circle-small-wrapper]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains(headItemValue);
                    })
                }

            });
            cy.wait(DELAY);

            cy.get('[data-testid=circle]').each((item) => {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=delete-from-head-btn] > img').should('not.exist');

        });

        it('Удаление элемента из tail', () => {
            let initialListLength: number = 1;
            let tailItemValue: string;
            cy.get('[data-testid=circle-text-value]').then(items => {
                const arr = items.toArray()
                initialListLength += arr.length;
                arr.forEach((el, index) => {
                    if(index === arr.length - 1) {
                        tailItemValue = el.textContent || ''
                    }
                })
            });

            cy.get('[data-testid=value-input]').type(`111115`);
            cy.get('[data-testid=add-to-head-btn]').click();
            cy.wait(DELAY);
            cy.get('[data-testid=delete-from-tail-btn]').click();
            cy.get('[data-testid=delete-from-tail-btn] > img').should('exist');


            cy.get('[data-testid=circle-text-value]').then(items => {
                const filtredArray = items.toArray().filter(elem => elem.textContent !== '' && elem.textContent!== tailItemValue);
                cy.wrap(filtredArray.length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=circle-small-wrapper]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains(tailItemValue);
                    })
                }

            });
            cy.wait(DELAY);

            cy.get('[data-testid=circle]').each((item) => {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=delete-from-tail-btn] > img').should('not.exist');

        });

        it('Удаление элемента по индексу', () => {
            let initialListLength: number;
            let initItemValue: string;

            cy.get('[data-testid=value-input]').type(`111115`);
            cy.get('[data-testid=add-to-head-btn]').click();
            cy.wait(DELAY);
            cy.get('[data-testid=circle-text-value]').then(items => {
                const arr = items.toArray()
                initialListLength = arr.length;
                arr.forEach((el, index) => {
                    if(index === 1) {
                        initItemValue = el.textContent || ''
                    }
                })
            });

            cy.get('input[type="number"]').type('1').trigger('change');
            cy.get('[data-testid=delete-by-index-btn]').click();
            cy.get('[data-testid=delete-by-index-btn] > img').should('exist');


            cy.get('[data-testid=circle-text-value]').then(items => {
                const filtredArray = items.toArray().filter(elem => elem.textContent !== '' && elem.textContent!== initItemValue);
                cy.wrap(filtredArray.length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=circle-small-wrapper]').each((item, index) => {
                if (index === 0) {
                    cy.wrap(item).find('[data-testid=circle]').each((el) => {
                        cy.wrap(el[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                        cy.wrap(el[0]).contains(initItemValue);
                    })
                }

            });
            cy.wait(DELAY);

            cy.get('[data-testid=circle]').each((item) => {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
            });

            cy.get('[data-testid=circle-text-value]').then(items => {
                cy.wrap(items.toArray().length).should('equal', initialListLength - 1)
            });

            cy.get('[data-testid=delete-by-index-btn] > img').should('not.exist');

        });
    });




});