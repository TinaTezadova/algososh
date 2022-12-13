import React, { useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Stack } from './stack';
import { getNewStackElements } from './utils';
import { Visualizer } from './visualizer/visualizer';
import styles from './styles.module.css';
import { ArrayItem } from '../../types/items';


export const StackVisualizer: React.FC = () => {
    const [elementsForRender, setElementsForRender] = useState<ArrayItem[]>([]);
    const [animation, setAnimation] = useState<'addItem' | 'deleteItem' | ''>('');
    const stack = useMemo(() => {
        return new Stack<string>(5)
    }, []);
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    };

    const handleClearStackClick = () => {
        stack.clear();
        setElementsForRender(stack.getStack());
    };

    const handleStackDeleteClick = async () => {
        setAnimation('deleteItem');
        stack.pop();
        setElementsForRender(await getNewStackElements(stack.getStack(), setElementsForRender));
        setAnimation('');
    };

    const handleAddItem = async (event: React.FormEvent) => {
        event.preventDefault();
        const value = inputValue.trim();

        if (!value) {
            setInputValue('');
            return;
        }
        else {
            stack.push(value);
            setInputValue('');
            setAnimation('addItem');
            setElementsForRender(await getNewStackElements(stack.getStack(), setElementsForRender));
            setAnimation('');
        }
    };

    return (
        <>
            <form className={styles.wrapper} onSubmit={handleAddItem}>
                <Input maxLength={4} isLimitText value={inputValue} onChange={handleInputChange} disabled={stack.getSize() === stack.getMaxSize()} extraClass={styles.input} placeholder="Введите текст" />
                <Button
                    text="Добавить"
                    type={"submit"}
                    isLoader={animation === 'addItem'}
                    disabled={Boolean(animation) || !inputValue || stack.getSize() === stack.getMaxSize()}
                    extraClass="ml-6"
                />

                <Button
                    text="Удалить"
                    isLoader={animation === 'deleteItem'}
                    disabled={stack.getSize() === 0}
                    extraClass="ml-6"
                    onClick={handleStackDeleteClick}
                />
                <Button
                    text="Очистить"
                    disabled={stack.getSize() === 0}
                    extraClass="ml-40"
                    onClick={handleClearStackClick}
                />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>

    )
}