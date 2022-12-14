
import { ElementStates } from '../../types/element-states';
import { IArrayItem, SetState } from '../../types/items';
import { delay } from '../../utils/utils';
import { SHORT_DELAY } from '../../consts/const'

export async function getNewQueueElements(array: IArrayItem[], index: number, setElementsForRender: SetState) {
    if (array.length > 0) {
        array[index].state = ElementStates.Changing;
        setElementsForRender([...array]);
        await delay(SHORT_DELAY);
        return array;
    }
    else {
        return [];
    }
}