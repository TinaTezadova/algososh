import { ArrayItem } from '../../types/items';
import { createNewArrayItem } from "../../utils/utils";


export function getFibonacci(number: number): ArrayItem<number>[] {
    const newArr: ArrayItem<number>[] = [];
    let numA = 0;
    let numB = 1;
    let sum;
    newArr.push(createNewArrayItem(numB));

    for(let i = 0; i < number; i++) {
        sum = numA + numB;
        newArr.push(createNewArrayItem(sum));
        numA = numB;
        numB = sum;

    }
    return newArr;

}