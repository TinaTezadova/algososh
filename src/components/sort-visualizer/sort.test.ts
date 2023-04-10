import { getBubbleSort, getSelectSort } from './utils';
import { IArrayItem } from '../../types/items';
import { Direction } from '../../types/direction';
import { ArrayItem } from '../../classes/array-item';
describe('sort array', () => {
    let array: IArrayItem[] = [];
    const setNewArray = (newArr: IArrayItem[]) => {
        array = newArr
    }
    const expectedResults = {
        emptyArray: [],
        arrayWithOneEl: [new ArrayItem('2')],
        arrayWithMultipleElements: {
            ascending: ['4', '6', '7', '8'],
            descending: ['8', '7', '6', '4'],
        },
    };

    describe('Сортировка массива методом пузырька', () => {
        it('Сортировка пустого массива', async () => {
            array = await getBubbleSort([], Direction.Ascending, setNewArray)

            expect(array).toEqual(expectedResults.emptyArray);
        });

        it('Сортировка массива из одного элемента', async () => {
            array = await getBubbleSort(expectedResults.arrayWithOneEl, Direction.Ascending, setNewArray)

            expect(array).toEqual(expectedResults.arrayWithOneEl);
        });

        it('Сортировка массива из нескольких элементов по возрастанию', async () => {
            const initialArray = [new ArrayItem('6'), new ArrayItem('4'), new ArrayItem('8'), new ArrayItem('7')]
            array = await getBubbleSort(initialArray, Direction.Ascending, setNewArray)

            expect(array.map(({ value }) => value)).toEqual(expectedResults.arrayWithMultipleElements.ascending);
        });

        it('Сортировка массива из нескольких элементов по убыванию', async () => {
            const initialArray = [new ArrayItem('6'), new ArrayItem('4'), new ArrayItem('8'), new ArrayItem('7')]
            array = await getBubbleSort(initialArray, Direction.Descending, setNewArray)

            expect(array.map(({ value }) => value)).toEqual(expectedResults.arrayWithMultipleElements.descending);
        });

    });

    describe('Сортировка массива выбором', () => {
        it('Сортировка пустого массива', async () => {
            array = await getSelectSort([], Direction.Ascending, setNewArray)

            expect(array).toEqual(expectedResults.emptyArray);
        });

        it('Сортировка массива из одного элемента', async () => {
            array = await getSelectSort(expectedResults.arrayWithOneEl, Direction.Ascending, setNewArray)

            expect(array).toEqual(expectedResults.arrayWithOneEl);
        });

        it('Сортировка массива из нескольких элементов по возрастанию', async () => {
            const initialArray = [new ArrayItem('6'), new ArrayItem('4'), new ArrayItem('8'), new ArrayItem('7')]
            array = await getSelectSort(initialArray, Direction.Ascending, setNewArray)

            expect(array.map(({ value }) => value)).toEqual(expectedResults.arrayWithMultipleElements.ascending);
        });

        it('Сортировка массива из нескольких элементов по убыванию', async () => {
            const initialArray = [new ArrayItem('6'), new ArrayItem('4'), new ArrayItem('8'), new ArrayItem('7')]
            array = await getSelectSort(initialArray, Direction.Descending, setNewArray)

            expect(array.map(({ value }) => value)).toEqual(expectedResults.arrayWithMultipleElements.descending);
        });

    });

});