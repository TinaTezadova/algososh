import { nanoid } from 'nanoid';
import { ElementStates } from '../types/element-states';
import { ListNode } from '../types/items';

export class ListItem<T> implements ListNode<T> {
    value: T;
    id: string;
    state: ElementStates;
    next: ListNode<T> | null;

    constructor(value: T, nextItem: ListNode<T> | null = null) {
        this.id = nanoid();
        this.value = value;
        this.state = ElementStates.Default;
        this.next = nextItem;
    }
};