import React, { useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Stack } from './stack';
import { getNewStackElements } from './utils';
import { Visualizer } from './visualizer/visualizer';
import styles from './styles.module.css';
import { IArrayItem } from '../../types/items';
import { useForm, IUseFormResult } from '../../hooks/use-form';


export const StackVisualizer: React.FC = () => {
    const [elementsForRender, setElementsForRender] = useState<IArrayItem[]>([]);
    const [animation, setAnimation] = useState<'addItem' | 'deleteItem' | ''>('');
    const { values, handleChange, setValues }: IUseFormResult = useForm({ text: ''});
    const stack = useMemo(() => {
        return new Stack<string>(5)
    }, []);
    const inputValue = useMemo(() => {
        return values.text
    }, [values.text]);

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
            setValues({...values, text: ''});
            return;
        }
        else {
            stack.push(value);
            setValues({...values, text: ''});
            setAnimation('addItem');
            setElementsForRender(await getNewStackElements(stack.getStack(), setElementsForRender));
            setAnimation('');
        }
    };

    return (
        <>
            <form className={styles.wrapper} onSubmit={handleAddItem}>
                <Input 
                maxLength={4} 
                isLimitText 
                value={inputValue} 
                onChange={handleChange} 
                disabled={stack.getSize() === stack.getMaxSize()} 
                extraClass={styles.input} 
                placeholder="Введите текст" 
                name='text'
                />
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
                    data-testid='delete-stack-item-btn'
                />
                <Button
                    text="Очистить"
                    disabled={stack.getSize() === 0}
                    extraClass="ml-40"
                    onClick={handleClearStackClick}
                    data-testid='clear-stack-btn'
                />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>

    )
}