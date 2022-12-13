import { nanoid } from "nanoid";
import { SHORT_DELAY } from "../../consts/const";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { ArrayItem, SetState } from "../../types/items";
import { swap, delay } from "../../utils/utils";

const generateRandomNum = (minLen: number, maxLen: number) => {
  const randomNum = Math.floor(minLen + Math.random() * (++maxLen - minLen));
  return randomNum;

};


export const generateNewArray = () => {
  const arrTemp = new Array(generateRandomNum(3, 17));
  return Array.from(arrTemp, () => ({
    id: nanoid(),
    value: String(generateRandomNum(0, 100)),
    state: ElementStates.Default
  }));
}


export async function getSelectSort(array: ArrayItem[], sortType: Direction, setElementsForRender: SetState) {

  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      array[minIndex].state = ElementStates.Changing;

      for (let k = i + 1; k < array.length; k++) {
        array[k].state = ElementStates.Changing;
        setElementsForRender([...array]);
        await delay(SHORT_DELAY);
        if (sortType === Direction.Ascending ? array[k].value < array[minIndex].value : array[k].value > array[minIndex].value) {
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


export async function getBubbleSort(array: ArrayItem[], sortType: Direction, setElementsForRender: SetState) {
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      array[i].state = ElementStates.Changing;
      for (let k = i + 1; k < array.length; k++) {
        array[k].state = ElementStates.Changing;
        setElementsForRender([...array]);
        await delay(SHORT_DELAY);

        const condition = sortType === Direction.Ascending ? array[k].value < array[i].value : array[k].value > array[i].value;

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