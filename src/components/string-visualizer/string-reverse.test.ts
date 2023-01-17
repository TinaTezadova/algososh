
import { IArrayItem } from '../../types/items';
import { reversing } from './utils';

describe('reverse string', () => {
    let array: IArrayItem[] = [];
    let expectedResult: string[];
    const setNewArray = (newArr: IArrayItem[]) => {
        array = newArr
    }

    it('Разворот строки с чётным количеством символов', async () => {
        array = await reversing('5892', setNewArray)
        expectedResult = ['2', '9', '8', '5'];

        expect(array.map(({ value }) => value)).toEqual(expectedResult);
    });

    it('Разворот строки с нечетным количеством символов', async () => {
        array = await reversing('589', setNewArray)
        expectedResult = ['9', '8', '5'];

        expect(array.map(({ value }) => value)).toEqual(expectedResult);
    });

    it('Разворот строки с одним символов', async () => {
        array = await reversing('9', setNewArray)
        expectedResult = ['9'];

        expect(array.map(({ value }) => value)).toEqual(expectedResult);
    });

    it('Разворот пустой строки', async () => {
        array = await reversing('', setNewArray)
        expectedResult = [];

        expect(array.map(({ value }) => value)).toEqual(expectedResult);
    });


});