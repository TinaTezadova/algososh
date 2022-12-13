import { nanoid } from 'nanoid';
import { ElementStates } from '../types/element-states';
import { ArrayItem, ListNode } from '../types/items';

export const delay = (delayInMs: number) => new Promise<void>(resolve => setTimeout(resolve, delayInMs));

export const swap = (array: any[], firstIndex: number, secondIndex: number): void => {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}

export const createNewArrayItem = (value: any, addPointers = false, head?: string | null, tail?:string | null, gone?: boolean): ArrayItem<any> => {
    const item = {
        id: nanoid(),
        value: value,
        state: ElementStates.Default,
    }
    const headVal = head || head === null ? head : '';
    const tailVal = tail || tail === null ? tail : '';
    return addPointers ? {...item, head: headVal, tail: tailVal, gone} : item
}

export const createNewListItem = (value: any, nextItem: ListNode<any> | null = null): ListNode<any> => {
    return {
        id: nanoid(),
        value: value,
        state: ElementStates.Default,
        next: nextItem,
    };
}