import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ArrayItem } from '../../types/items';
import { List } from './list';
import styles from './styles.module.css';
import { addNewElements, deleteElements } from './utils';
import { Visualizer } from './visualizer/visualizer';

type AnimationType = 'addToHead' | 'addToTail' | 'deleteHead' | 'deleteTail' | 'addItemByIndex' | 'deleteItemByIndex' | '';

export const ListVisualizer: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [indexValue, setIndexValue] = useState<number | string>('');
    const [elementsForRender, setElementsForRender] = useState<ArrayItem[]>([]);
    const [animation, setAnimation] = useState<AnimationType>('');
    const list = useMemo(() => {
        return new List<string>(5)
    }, []);
    const addItemByIndexBtnDisabled = useMemo((): boolean => {
        return !indexValue || inputValue === '' || animation !== '' || Number(indexValue) > list.getListLength() - 1
            || list.getListLength() === list.getListMaxSize()

    }, [animation, indexValue, inputValue, list])

    const handleValueChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value);
    };

    const handleAddToHeadClick = async () => {
        const value = inputValue.trim();
        if (!value) {
            setInputValue('')
            return;
        }

        list.addToStart(inputValue);
        setInputValue('');
        setAnimation('addToHead');
        setElementsForRender(await addNewElements(elementsForRender, inputValue, 'addToHead', setElementsForRender));
        setElementsForRender(list.getListArray());
        setAnimation('');
    };

    const handleAddToTailClick = async () => {
        const value = inputValue.trim();
        if (!value) {
            setInputValue('')
            return;
        }

        list.addToEnd(inputValue);
        setInputValue('');
        setAnimation('addToTail');
        setElementsForRender(await addNewElements(elementsForRender, inputValue, 'addToTail', setElementsForRender));
        setElementsForRender(list.getListArray());
        setAnimation('');
    }

    const handleDeleteFromHeadClick = async () => {
        list.deleteHeadItem();
        setAnimation('deleteHead');
        setElementsForRender(await deleteElements(elementsForRender, 'deleteHead', setElementsForRender));
        setElementsForRender(list.getListArray());
        setAnimation('');
    };

    const handleDeleteFromTailClick = async () => {
        list.deleteTailItem();
        setAnimation('deleteTail');
        setElementsForRender(await deleteElements(elementsForRender, 'deleteTail', setElementsForRender));
        setElementsForRender(list.getListArray());
        setAnimation('');
    };

    const handleIndexChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const index = event.currentTarget.value;
        const arrayTemp = Array.from(new Array(list.getListLength()), () => '')

        if (arrayTemp[Number(index)] === '') {
            setIndexValue(index);
        }
    };

    const handleAddItemByIndex = async () => {
        const value = inputValue.trim();
        if (!value) {
            setInputValue('')
            return;
        }

        list.addItemByIndex(inputValue, Number(indexValue));
        setInputValue('');
        setIndexValue('');
        setAnimation('addItemByIndex');
        setElementsForRender(await addNewElements(elementsForRender, inputValue, 'addItemByIndex', setElementsForRender, Number(indexValue)));
        setElementsForRender(list.getListArray());
        setAnimation('');
    };


    const handleDeleteItemByIndex = async () => {
        list.deleteItemByIndex(Number(indexValue));
        setIndexValue('');
        setAnimation('deleteItemByIndex');
        setElementsForRender(await deleteElements(elementsForRender, 'deleteItemByIndex', setElementsForRender, Number(indexValue)));
        setElementsForRender(list.getListArray());
        setAnimation('');
    };

    useEffect(() => {
        setElementsForRender(list.getListArray())
    }, []);


    return (
        <>
            <form className={styles.wrapper}>
                <div className={styles.row}>
                    <Input
                        placeholder="Введите значение"
                        value={inputValue}
                        maxLength={4}
                        isLimitText
                        onChange={handleValueChange}
                        disabled={list.getListLength() === list.getListMaxSize() || animation !== ''}
                        extraClass={styles.input}
                    />
                    <Button
                        text="Добавить в head"
                        isLoader={animation === 'addToHead'}
                        disabled={!inputValue || list.getListLength() === list.getListMaxSize() || animation !== ''}
                        onClick={handleAddToHeadClick}
                        linkedList="small"
                        extraClass={'ml-6'}
                    />
                    <Button
                        text="Добавить в tail"
                        isLoader={animation === 'addToTail'}
                        disabled={!inputValue || list.getListLength() === list.getListMaxSize() || animation !== ''}
                        onClick={handleAddToTailClick}
                        linkedList="small"
                        extraClass={'ml-6'}
                    />
                    <Button
                        text="Удалить из head"
                        isLoader={animation === 'deleteHead'}
                        disabled={list.getListLength() === 0 || animation !== ''}
                        onClick={handleDeleteFromHeadClick}
                        linkedList="small"
                        extraClass={'ml-6'}
                    />
                    <Button
                        text="Удалить из tail"
                        isLoader={animation === 'deleteTail'}
                        disabled={list.getListLength() === 0 || animation !== ''}
                        onClick={handleDeleteFromTailClick}
                        linkedList="small"
                        extraClass={'ml-6'}
                    />
                </div>
                <div className={styles.row}>
                    <Input
                        placeholder="Введите индекс"
                        type="number"
                        min={0}
                        max={list.getListLength() ? list.getListLength() - 1 : 0}
                        value={indexValue}
                        disabled={animation !== '' || list.getListLength() === 0}
                        onChange={handleIndexChange}
                        extraClass={styles.input}
                    />
                    <Button
                        text="Добавить по индексу"
                        isLoader={animation === 'addItemByIndex'}
                        linkedList="big"
                        disabled={addItemByIndexBtnDisabled}
                        onClick={handleAddItemByIndex}
                        extraClass={'ml-6'}
                    />
                    <Button
                        text="Удалить по индексу"
                        isLoader={animation === 'deleteItemByIndex'}
                        linkedList="big"
                        disabled={!indexValue || list.getListLength() === 0 || animation !== '' || Number(indexValue) > list.getListLength() - 1}
                        onClick={handleDeleteItemByIndex}
                        extraClass={'ml-6'}
                    />
                </div>
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>
    )
}