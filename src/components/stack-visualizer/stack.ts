import { ArrayItem } from '../../types/items';
import { createNewArrayItem } from '../../utils/utils'

export interface IStack<T> {
    pop: () => void;
    push: (value: T) => void;
    getStack: () => ArrayItem[];
    clear: () => void;
    getSize:() => number;
    getMaxSize:() => number;
};

export class Stack<T> implements IStack<T> {
    array: ArrayItem[];
    maxStackSize: number;

    constructor(maxStackSize: number) {
        this.array = [];
        this.maxStackSize = maxStackSize;
    };

    pop() {
        this.array.pop();
    };

    push(value: T) {
        if(this.maxStackSize > this.array.length) {
            this.array.push(createNewArrayItem(value))
        }
    };
    
    clear() {
        this.array = []
    };

    getStack(){
        return this.array
    };

    getSize() {
        return this.array.length
    };

    getMaxSize() {
        return this.maxStackSize
    };
    
}