import { nanoid } from 'nanoid';
import { DELAY } from "../../consts/const";
import { ElementStates } from "../../types/element-states";
import { IArrayItem, SetState } from "../../types/items";
import { swap, delay } from "../../utils/utils";

export async function reversing(string: string, setElementsForRender: SetState) {
    const newArr: IArrayItem[] = [];
    for (let subString of string) {
        newArr.push({
            id: nanoid(),
            value: subString,
            state: ElementStates.Default
        })
    }

    let start = 0;
    let end = newArr.length - 1;
    while (start <= end) {
        newArr[start].state = ElementStates.Changing;
        newArr[end].state = ElementStates.Changing;
        setElementsForRender([...newArr])
        await delay(DELAY);
        swap(newArr, start, end);
        newArr[start].state = ElementStates.Modified;
        newArr[end].state = ElementStates.Modified;
        setElementsForRender([...newArr])

        start++;
        end--;

    }
    return newArr;

}