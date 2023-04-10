import { Circle } from './circle';
import { render, screen } from '@testing-library/react';
import { ElementStates } from '../../../types/element-states';

describe('Тестирвание компонента Circle', () => {
    it('Рендер компонента без текста', () => {
        render(<Circle />);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с текстом', () => {
        render(<Circle letter="Text"/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('Text');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с текстом в head', () => {
        render(<Circle head="Text"/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('Text');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с другим реакт-компонентом в head', () => {
        render(<Circle head={<p>Text</p>}/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('Text');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с текстом в tail', () => {
        render(<Circle tail="Text"/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('Text');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с другим реакт-компонентом в tail', () => {
        render(<Circle tail={<p>Text</p>}/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('Text');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с index', () => {
        render(<Circle index={3}/>);
        const circle = screen.getByTestId('circle-wrapper');
        expect(circle).toHaveTextContent('3');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента с пропсом isSmall', () => {
        render(<Circle isSmall/>);
        const circle = screen.getByTestId('circle');
        expect(circle).toHaveClass('small');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента в состоянии default', () => {
        render(<Circle state={ElementStates.Default} letter="defaultState"/>);
        const circle = screen.getByTestId('circle');
        expect(circle).toHaveTextContent('defaultState');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента в состоянии changing', () => {
        render(<Circle state={ElementStates.Changing} letter="changingState"/>);
        const circle = screen.getByTestId('circle');
        expect(circle).toHaveTextContent('changingState');
        expect(circle).toMatchSnapshot();
    });

    it('Рендер компонента в состоянии modified', () => {
        render(<Circle state={ElementStates.Modified} letter="modifiedState"/>);
        const circle = screen.getByTestId('circle');
        expect(circle).toHaveTextContent('modifiedState');
        expect(circle).toMatchSnapshot();
    });

});