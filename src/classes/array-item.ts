import { nanoid } from 'nanoid';
import { ElementStates } from '../types/element-states';
import { IArrayItem } from '../types/items';

export class ArrayItem<T = number> implements IArrayItem<T> {
    value: T;
    id: string;
    state: ElementStates;
    head?: string | null;
    tail?: string | null;
    gone?: boolean;

    constructor(value: T, addPointers: boolean = false, head?: string | null, tail?: string | null, gone?: boolean) {
        this.value = value;
        this.id = nanoid();
        this.state = ElementStates.Default;
        if (addPointers) {
            const headVal = head || head === null ? head : '';
            const tailVal = tail || tail === null ? tail : '';
            this.head = headVal;
            this.tail = tailVal;
            if (typeof gone === 'boolean') {
                this.gone = gone;
            }
        }
    }
};