import { IArrayItem, SetState } from "../../types/items";
import { delay } from "../../utils/utils";
import { DELAY } from '../../consts/const';
import { ElementStates } from "../../types/element-states";
import { ArrayItem } from '../../classes/array-item';


export async function addNewElements(
    array: IArrayItem<string>[],
    value: string,
    action: 'addToHead' | 'addToTail' | 'addItemByIndex',
    setElementsForRender: SetState,
    index?: number,
) {

    if (array.length === 0 || value === '') {
        return [];
    }

    if (action === 'addToTail') {
        const tailIndex = array.length - 1;
        array[tailIndex].head = value;

        setElementsForRender([...array]);
        await delay(DELAY);

        if (tailIndex === 0) {
            array[tailIndex].head = 'head';
        } else {
            array[tailIndex].head = null;
        }

        array[tailIndex].tail = null;
        array.push(new ArrayItem<string>(value, true, null, 'tail'));
        array.at(-1)!.state = ElementStates.Modified;

        setElementsForRender([...array]);
        await delay(DELAY);
    }

    if (action === 'addToHead' || index === 0) {
        array[0].head = value;

        setElementsForRender([...array]);
        await delay(DELAY);

        array[0].head = null;
        array.unshift(new ArrayItem<string>(value, true, 'head', null));
        array[0].state = ElementStates.Modified;

        setElementsForRender([...array]);
        await delay(DELAY);
    }

    if (!index || index >= array.length || index < 0) {
        return [];
    }

    if (action === 'addItemByIndex') {
        let currentIndex = 0;
        array[currentIndex].head = value;

        setElementsForRender([...array]);
        await delay(DELAY);

        while (currentIndex < index) {
            if (currentIndex === 0) {
                array[currentIndex].head = 'head';
            } else {
                array[currentIndex].head = null;
            }
            array[currentIndex].state = ElementStates.Changing;
            array[currentIndex].gone = true;
            currentIndex++;
            array[currentIndex].head = value;

            setElementsForRender([...array]);
            await delay(DELAY);
        }

        array[currentIndex].head = null;
        array.splice(currentIndex, 0, new ArrayItem<string>(value));
        array[currentIndex].state = ElementStates.Modified;

        setElementsForRender([...array]);
        await delay(DELAY);
    }
    return array;
}

export async function deleteElements(
    array: IArrayItem[],
    action: 'deleteHead' | 'deleteTail' | 'deleteItemByIndex',
    setElementsForRender: SetState,
    index?: number
) {
    if (array.length > 0) {
        if (action === 'deleteTail') {
            const tail = array.length - 1;
            array[tail].tail = array[tail].value;
            array[tail].value = '';

            setElementsForRender([...array]);
            await delay(DELAY);
        }


        if (action === 'deleteHead' || index === 0) {
            array[0].tail = array[0].value;
            array[0].value = '';

            setElementsForRender([...array]);
            await delay(DELAY);
        }


        if (!index || index >= array.length || index < 0) {
            return [];
        }

        if (action === 'deleteItemByIndex') {
            let currentIndex = 0;

            while (currentIndex < index) {
                array[currentIndex].state = ElementStates.Changing;
                setElementsForRender([...array]);
                await delay(DELAY);
                array[currentIndex].gone = true;
                currentIndex++;
            }

            array[currentIndex].state = ElementStates.Changing;
            array[currentIndex].tail = array[currentIndex].value;
            array[currentIndex].value = '';

            setElementsForRender([...array]);
            await delay(DELAY);
        }
        return array;
    }
    else {
        return [];
    }

}