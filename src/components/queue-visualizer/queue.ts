import { ArrayItem } from "../../types/items";
import { createNewArrayItem } from '../../utils/utils';

export interface IQueue<T> {
    enqueue: (value: T) => void;
    dequeue: () => void;
    clear: () => void;
    getQueue: () => ArrayItem<T>[];
    getQueueLength: () => number;
    getMaxSize: () => number;
    getHeadPointer: () => number;
    getTailPointer: () => number;
};

export class Queue<T> implements IQueue<T> {
    array: ArrayItem[];
    maxQueueSize: number;
    queueLength: number;
    headPointer: number;
    tailPointer: number;

    constructor(maxQueueSize: number) {
        this.array = [];
        this.maxQueueSize = maxQueueSize;
        this.queueLength = 0;
        this.headPointer = 0;
        this.tailPointer = 0;
    };

    enqueue(value: T) {
        if (this.queueLength < this.maxQueueSize) {
            if (this.queueLength > 0) {
                this.tailPointer = (this.tailPointer + 1) % this.maxQueueSize;
            }
            else {
                this.tailPointer = 0;
            }
            
            this.array[this.tailPointer] = createNewArrayItem(value);
            this.queueLength++;
        }
        else {
            throw new Error("Maximum length exceeded");
        }
    };

    dequeue() {
        if (this.queueLength === 0) {
            throw new Error("No elements in the queue");
        }
        else {
            delete this.array[this.headPointer];
            this.queueLength--;

            if (this.queueLength) {
                this.headPointer = (this.headPointer + 1) % this.maxQueueSize;
            }
            else {
                this.headPointer = 0;
                this.tailPointer = 0;
            }
        }

    };

    clear() {
        this.array = [];
        this.queueLength = 0;
        this.headPointer = 0;
        this.tailPointer = 0;
    };

    getQueue() {
        const container = Array.from(new Array(this.maxQueueSize), () => createNewArrayItem('', true));
        if (this.queueLength > 0) {
            this.array.forEach((item, index) => {
                container[index].value = item.value;
            });

            container[this.headPointer].head = 'head';
            container[this.tailPointer].tail = 'tail';
        }
        console.log(container);
        return container;

    };

    getQueueLength() {
        return this.queueLength
    };

    getMaxSize() {
        return this.maxQueueSize
    };

    getHeadPointer() {
        return this.headPointer
    };

    getTailPointer() {
        return this.tailPointer
    };

}