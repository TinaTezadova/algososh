import { Button } from './button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Тестирвание компонента Button', () => {
    it('Рендер кнопки с текстом', () => {
        render(<Button text="Текст" />);
        const button = screen.getByRole('button');
        expect(button).toMatchSnapshot();
    });

    it('Рендер кнопки без текста', () => {
        render(<Button />);
        const button = screen.getByRole('button');
        expect(button).toMatchSnapshot();
    });

    it('Рендер заблокированной кнопки', () => {
        render(<Button disabled />);
        const button = screen.getByRole('button');
        expect(button).toMatchSnapshot();
    });

    it('Рендер кнопки с лоадером', () => {
        render(<Button isLoader />);
        const button = screen.getByRole('button');
        expect(button).toMatchSnapshot();
    });

    it('Проверка клика на кнопку', () => {
        const click = jest.fn();
        render(<Button onClick={click} />);
        const button = screen.getByRole('button');

        expect(click).toBeCalledTimes(0);
        userEvent.click(button);

        expect(click).toHaveBeenCalledTimes(1);
    });

});