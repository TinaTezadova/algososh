import { SHORT_DELAY } from "../../consts/const";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { IArrayItem, SetState } from "../../types/items";
import { swap, delay } from "../../utils/utils";


export async function getSelectSort(array: IArrayItem[], sortType: Direction, setElementsForRender: SetState | ((arr: IArrayItem[])=> void)) {

  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      array[minIndex].state = ElementStates.Changing;

      for (let k = i + 1; k < array.length; k++) {
        array[k].state = ElementStates.Changing;
        setElementsForRender([...array]);
        await delay(SHORT_DELAY);
        const currentItemValue = Number(array[k].value);
        const minIndexItemValue = Number(array[minIndex].value);
        if (sortType === Direction.Ascending ? currentItemValue < minIndexItemValue : currentItemValue > minIndexItemValue) {
          minIndex = k;
        }

        array[k].state = ElementStates.Default;
        setElementsForRender([...array]);
      }
      
      swap(array, i, minIndex);

      array[minIndex].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setElementsForRender(array);
    }
    return array
  }
  else {
    return []
  }
}


export async function getBubbleSort(array: IArrayItem[], sortType: Direction, setElementsForRender: SetState | ((arr: IArrayItem[])=> void)) {
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      array[i].state = ElementStates.Changing;
      for (let k = i + 1; k < array.length; k++) {
        array[k].state = ElementStates.Changing;
        setElementsForRender([...array]);
        await delay(SHORT_DELAY);

        const firstValue = Number(array[k].value);
        const secondValue = Number(array[i].value);
        const condition = sortType === Direction.Ascending ? firstValue < secondValue : firstValue > secondValue;

        if (condition) {
          swap(array, i, k);
        }

        array[k].state = ElementStates.Default;
      }
      array[i].state = ElementStates.Modified;
      setElementsForRender([...array]);
    }
    return array
  }
  else {
    return []
  }


}