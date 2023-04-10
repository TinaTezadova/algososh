describe('Проверка корректой работы роутинга в приложении', () => {
    const checkRouting = (pageUrl: string, pageTitle: string) => () => {
        cy.get('[data-testid=navigationBlock]').should('exist');
        cy.get(`[href$=${pageUrl}]`).click();
        cy.get('[data-testid=navigationBlock]').should('not.exist');
        cy.contains(pageTitle, { matchCase: false }).should('exist');
        cy.get('[data-testid=returnBackButton]').click();
        cy.get('[data-testid=navigationBlock]').should('exist');
    };

    beforeEach(() => {
        cy.visit('/');
        cy.get('[data-testid=navigationBlock]')
    });

    it(
        'Открытие страницы "Реверс строки" и возврат на главную страницу по клику',
        checkRouting('recursion', 'Строка')
    );

    it(
        'Открытие страницы "Последовательность Фибоначчи" и возврат на главную страницу по клику',
        checkRouting('fibonacci', 'Последовательность Фибоначчи')
    );

    it(
        'Открытие страницы "Сортировка массива" и возврат на главную страницу по клику',
        checkRouting('sorting', 'сортировка массива')
    );

    it(
        'Открытие страницы "Стек" и возврат на главную страницу по клику',
        checkRouting('stack', 'Стек')
    );

    it(
        'Открытие страницы "Очередь" и возврат на главную страницу по клику',
        checkRouting('queue', 'Очередь')
    );

    it(
        'Открытие страницы "Связный список" и возврат на главную страницу по клику',
        checkRouting('list', 'Связный список')
    );
});