import { IArrayItem } from '../../types/items';
import { ArrayItem } from '../../classes/array-item';


export function getFibonacci(number: number): IArrayItem<number>[] {
    const newArr: IArrayItem<number>[] = [];
    let numA = 0;
    let numB = 1;
    let sum;
    newArr.push(new ArrayItem(numB));

    for(let i = 0; i < number; i++) {
        sum = numA + numB;
        newArr.push(new ArrayItem(sum));
        numA = numB;
        numB = sum;

    }
    return newArr;

}