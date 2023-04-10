import { ElementStates } from '../../src/types/element-states';
import { DELAY } from "../../src/consts/const";
import { convertStrToRegexp } from './utils';


describe('Проверка корректой работы визуализатора реверса строки', () => {
    beforeEach(() => {
        cy.visit('/recursion');
    });

    it('Кнопка реверса заблокирована при пустом инпуте', () => {
        cy.get('input').should('have.value', '');
        cy.get('button[type=submit]').should('have.attr', 'disabled');
    });

    it('Кнопка реверса активна при заполненном инпуте', () => {
        cy.get('input').type('987456').should('have.value', '987456');
        cy.get('button[type=submit]').click();
    });

    const checkButtonState = (requiredState: 'active' | 'disabled') => {
        const buttonStateCondition = requiredState === 'disabled' ? 'have.attr' : 'not.have.attr';
        const loaderImgStateCondition = requiredState === 'disabled' ? 'exist' : 'not.exist';

        cy.get('button[type=submit]').should(buttonStateCondition, 'disabled');
        cy.get('button[type=submit] > img').should(loaderImgStateCondition);
    };

    it('Разворот строки с четным количеством символов', () => {
        cy.get('input').type('4567')
        cy.get('button[type=submit]').click();
        cy.get('input').should('have.attr', 'disabled');

        checkButtonState('disabled');

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '4567');
        });

        cy.get('[data-testid=circle]').each((item, index) => {
            if (index === 0 || index === 3) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                return;
            }
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
        });

        cy.wait(DELAY);

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '7564');
        });

        cy.get('[data-testid=circle]').each((item, index) => {
            if (index === 0 || index === 3) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
                return;
            }
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
        });

        cy.wait(DELAY);

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '7654');
        });

        cy.get('[data-testid=circle]').each(item => {
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
        });

        checkButtonState('active');
    });



    it('Разворот строки с нечетным количеством символов', () => {
        cy.get('input').type('45678')
        cy.get('button[type=submit]').click();
        cy.get('input').should('have.attr', 'disabled');

        checkButtonState('disabled');

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '45678');
        });

        cy.get('[data-testid=circle]').each((item, index) => {
            if (index === 0 || index === 4) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                return;
            }
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
        });

        cy.wait(DELAY);

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '85674');
        });

        cy.get('[data-testid=circle]').each((item, index) => {
            if (index === 0 || index === 4) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
                return;
            }
            if (index === 1 || index === 3) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                return;
            }
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Default));
        });

        cy.wait(DELAY);

        cy.get('[data-testid=circle-text-value]').then(value => {
            cy.wrap(value.text()).should('equal', '87654');
        });

        cy.get('[data-testid=circle]').each((item, index) => {
            if (index === 2) {
                cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Changing));
                return;
            }
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
        });

        cy.wait(DELAY);

        cy.get('[data-testid=circle]').each(item => {
            cy.wrap(item[0].className).should('match', convertStrToRegexp(ElementStates.Modified));
        });

        checkButtonState('active');
    });

});