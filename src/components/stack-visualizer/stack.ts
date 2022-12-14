import { ArrayItem } from '../../classes/array-item';
import { IArrayItem } from '../../types/items';

export interface IStack<T> {
    pop: () => void;
    push: (value: T) => void;
    getStack: () => IArrayItem<T>[];
    clear: () => void;
    getSize:() => number;
    getMaxSize:() => number;
};

export class Stack<T> implements IStack<T> {
    array: IArrayItem<T>[];
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
            this.array.push(new ArrayItem<T>(value))
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