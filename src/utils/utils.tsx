import { nanoid } from 'nanoid';
import { ListItem } from '../classes/list-item';
import { ElementStates } from '../types/element-states';
import { IArrayItem, ListNode } from '../types/items';

export const delay = (delayInMs: number) => new Promise<void>(resolve => setTimeout(resolve, delayInMs));

export const swap = (array: Array<number | string | IArrayItem>, firstIndex: number, secondIndex: number): void => {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

const generateRandomNum = (minLen: number, maxLen: number) => {
    const randomNum = Math.floor(minLen + Math.random() * (++maxLen - minLen));
    return randomNum;

};


export const generateNewArray = (minLen: number, maxLen: number): IArrayItem[] => {
    const arrTemp = new Array(generateRandomNum(minLen, maxLen));
    return Array.from(arrTemp, () => ({
        id: nanoid(),
        value: String(generateRandomNum(0, 100)),
        state: ElementStates.Default
    }));
};

export const generateNewList = (maxLen: number): ListNode<string> | null => {
    const randomNumber = Math.floor(Math.random() * maxLen) + 1;
    const headNode = new ListItem<string>(String(0));
    let current = headNode;

    for (let i = 0; i < randomNumber; i++) {
        const newNode = new ListItem<string>(String(generateRandomNum(1, 99)));
        current.next = newNode;
        current = current.next;
    }

    return headNode.next;

}