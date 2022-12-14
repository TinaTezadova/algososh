import React, { useEffect, useState } from 'react';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import styles from './styles.module.css';
import { getBubbleSort, getSelectSort } from './utils';
import { generateNewArray } from '../../utils/utils';
import { Visualizer } from './visualizer/visualizer';
import { IArrayItem } from '../../types/items';

type SortMethod = 'bubble' | 'select';
type SortType = 'ascending' | 'descending';

export const SortVisualizer: React.FC = () => {
    const [sortMethod, setSortMethod] = useState<SortMethod>('select');
    const [sortType, setSortType] = useState<SortType>('ascending');
    const [elementsForRender, setElementsForRender] = useState<IArrayItem[]>([]);
    const [animation, setAnimation] = useState<boolean>(false);

    const handleSortMethodChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value as SortMethod;
        setSortMethod(value);
    };

    const handleArraySort = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const sortType = event.currentTarget.value as Direction;
        setSortType(sortType)

        if (sortMethod === 'select') {
            setAnimation(true);
            setElementsForRender(await getSelectSort(elementsForRender, sortType, setElementsForRender));
            setAnimation(false);

        }
        else if (sortMethod === 'bubble') {
            setAnimation(true);
            setElementsForRender(await getBubbleSort(elementsForRender, sortType, setElementsForRender));
            setAnimation(false);
        }
        setAnimation(false);
    };

    const handleCreateNewArrayClick = () => {
        setElementsForRender(generateNewArray(3, 17))
    }

    useEffect(() => {
        handleCreateNewArrayClick()
    }, []);

    return (
        <>
            <form className={styles.wrapper}>
                <RadioInput label='Выбор' value="select" name="type" checked={sortMethod === 'select'} disabled={animation} onChange={handleSortMethodChange} />
                <RadioInput label='Пузырёк' value="bubble" name="type" checked={sortMethod === 'bubble'} disabled={animation} onChange={handleSortMethodChange} extraClass={"ml-10"} />
                <Button
                    text="По возрастанию"
                    name="ascending"
                    sorting={Direction.Ascending}
                    value="ascending"
                    disabled={animation}
                    onClick={handleArraySort}
                    isLoader={animation && sortType === Direction.Ascending}
                    extraClass={`${styles.button} ml-25`}
                />
                <Button
                    text="По убыванию"
                    name="descending"
                    sorting={Direction.Descending}
                    value="descending"
                    disabled={animation}
                    onClick={handleArraySort}
                    isLoader={animation && sortType === Direction.Descending}
                    extraClass={`${styles.button} ml-6`}
                />

                <Button
                    text="Новый массив"
                    disabled={animation}
                    onClick={handleCreateNewArrayClick}
                    extraClass={`${styles.button} ml-40`} />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>
    )
}