import { IArrayItem, ListNode } from "../../types/items";
import { ListItem } from '../../classes/list-item';
import { ArrayItem } from '../../classes/array-item';
import { generateNewArray } from "../../utils/utils";

interface IList<T> {
    addToEnd: (item: T) => void;
    addToStart: (item: T) => void;
    deleteItemByIndex: (index: number) => void;
    addItemByIndex: (item: T, index: number) => void;
    deleteHeadItem: () => void;
    deleteTailItem: () => void;
    getListArray: () => IArrayItem<T | string>[];
    getListLength: () => number;
    getListMaxSize: () => number;
    getHeadPointer: () => ListNode<T> | null;
    getTailPointer: () => ListNode<T> | null;
};

export class List<T> implements IList<T> {
    maxListSize: number;
    listLength: number;
    tailPointer: ListNode<T> | null;
    headPointer: ListNode<T> | null;

    constructor(maxListSize: number, nodeItem?: ListNode<T> | null) {
        this.maxListSize = maxListSize;
        if (nodeItem) {
            this.headPointer = nodeItem;
            let currentItem = this.headPointer;
            this.listLength = 1;

            while (currentItem.next) {
                currentItem = currentItem.next;
                this.listLength++;
            }

            this.tailPointer = currentItem;
        }
        else {
            this.headPointer = null;
            this.tailPointer = null;
            this.listLength = 0;
        }
    };

    addToEnd(item: T) {
        if (this.listLength === this.maxListSize) {
            throw new Error("Maximum length exceeded");
        }

        const node = new ListItem<T>(item);
        if (this.tailPointer) {
            this.tailPointer.next = node;
            this.tailPointer = this.tailPointer.next;
        } else {
            this.headPointer = node;
            this.tailPointer = node;
        }
        this.listLength++;
    };

    addToStart(item: T) {
        if (this.listLength === this.maxListSize) {
            throw new Error("Maximum length exceeded");
        }
        const node = new ListItem<T>(item);
        if (this.headPointer) {
            node.next = this.headPointer;
            this.headPointer = node;
        } else {
            this.headPointer = node;
            this.tailPointer = this.headPointer;
        }

        this.listLength++;
    };
    deleteItemByIndex(index: number) {
        if (this.listLength === 0) {
            throw new Error("List is empty");
        }

        if (index === 0) {
            this.deleteHeadItem();
            return;
        }

        if (index === this.listLength - 1) {
            this.deleteTailItem();
            return;
        }

        if (index > 0 && this.listLength > index) {
            let currentItem = this.headPointer;
            let prevItem = null;
            for (let i = 1; i <= index; i++) {
                prevItem = currentItem;
                if (currentItem) {
                    currentItem = currentItem.next;
                }
            }
            if (prevItem && currentItem) {
                prevItem.next = currentItem.next;
                this.listLength--;
            } else {
                throw new Error("This index doesn't exist");
            }
        }
    };

    addItemByIndex(item: T, index: number) {
        if (this.listLength === this.maxListSize) {
            throw new Error("Maximum length exceeded");
        }

        if (index === 0) {
            this.addToStart(item);
            return;
        }

        if (index > 0 && this.listLength > index) {
            const node = new ListItem<T>(item);

            let currentItem = this.headPointer;
            let currentIndex = 0;

            while (currentIndex < index && currentItem) {
                if (currentIndex === index - 1) {
                    node.next = currentItem.next;
                    currentItem.next = node;
                }
                currentItem = currentItem.next;
                currentIndex++;
            }
            this.listLength++;
        } else {
            throw new Error("This index doesn't exist");
        }
    };

    deleteHeadItem() {
        if (this.headPointer && this.listLength >= 1) {
            this.headPointer = this.headPointer.next;
            if (this.listLength === 1) {
                this.tailPointer = null;
            }
            this.listLength--;
        } else {
            throw new Error("Head position is empty");
        }
    };

    deleteTailItem() {
        if (this.tailPointer && this.headPointer) {
            let currentItem = this.headPointer;
            let prevItem;
            while (currentItem.next) {
                prevItem = currentItem;
                currentItem = currentItem.next;
            }
            if (prevItem) {
                prevItem.next = null;
                this.tailPointer = prevItem;
            } else {
                this.headPointer = null;
                this.tailPointer = null;
            }
            this.listLength--;
        } else {
            throw new Error("Tail position is empty");
        }
    };
    getListArray() {
        const array = [];

        if (this.listLength > 0) {
            let currentItem = this.headPointer;
            while (currentItem) {
                array.push(new ArrayItem<T>(currentItem.value));

                currentItem = currentItem.next;
            }
            array[0].head = 'head';
            array[this.listLength - 1].tail = 'tail';
        }

        return array;
    };

    getListLength() {
        return this.listLength;
    };

    getListMaxSize() {
        return this.maxListSize;
    };

    getHeadPointer() {
        return this.headPointer;
    };

    getTailPointer() {
        return this.tailPointer;
    };

}