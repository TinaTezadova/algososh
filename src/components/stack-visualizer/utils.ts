import { ArrayItem, SetState } from "../../types/items";
import { delay } from "../../utils/utils";
import { SHORT_DELAY } from '../../consts/const';
import { ElementStates } from "../../types/element-states";

export async function getNewStackElements(array: ArrayItem[], setElementsForRender: SetState) {
    if (array.length > 0) {
        const highIndex = array.length - 1;
        array[highIndex].state = ElementStates.Changing;

        setElementsForRender([...array]);
        await delay(SHORT_DELAY);
        array[highIndex].state = ElementStates.Default;
        setElementsForRender([...array]);
        return array;
    }
    else {
        return [];
    }
}