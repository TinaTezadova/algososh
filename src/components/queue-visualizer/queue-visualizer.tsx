import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { IArrayItem } from '../../types/items';
import { Queue } from './queue';
import { getNewQueueElements } from './utils';
import { Visualizer } from './visualizer/visualizer';
import styles from './styles.module.css';
import { useForm, IUseFormResult } from '../../hooks/use-form';

export const QueueVisualizer: React.FC = () => {
    const { values, handleChange, setValues }: IUseFormResult = useForm({ value: ''});
    const [elementsForRender, setElementsForRender] = useState<IArrayItem[]>([]);
    const [animation, setAnimation] = useState<'addItem' | 'deleteItem' | ''>('');
    const queue = useMemo(() => {
        return new Queue<string>(5)
    }, []);

    const inputValue = useMemo(() => {
        return values.value
    }, [values.value]);

    const handleClearClick = () => {
        queue.clear();
        setElementsForRender(queue.getQueue());
    };

    const handleDeleteClick = async () => {
        setAnimation('deleteItem');
        queue.dequeue();
        setElementsForRender(await getNewQueueElements(queue.getQueue(), queue.getHeadPointer(), setElementsForRender));
        setAnimation('');
    };

    const handleAddItem = async (event: React.FormEvent) => {
        event.preventDefault();
        const value = inputValue.trim();

        if (!value) {
            setValues({...values, value: ''});
            return;
        }
        else {

            queue.enqueue(value);
            setValues({...values, value: ''});
            setAnimation('addItem');
            setElementsForRender(await getNewQueueElements(queue.getQueue(), queue.getTailPointer(), setElementsForRender));
            setAnimation('');

        }


    };

    useEffect(() => {
        setElementsForRender(queue.getQueue());
      }, []);

    return (
        <>
            <form className={styles.wrapper} onSubmit={handleAddItem}>
                <Input 
                maxLength={4} 
                isLimitText 
                value={inputValue} 
                onChange={handleChange} 
                disabled={queue.getQueueLength() === queue.getMaxSize()} 
                extraClass={styles.input} 
                placeholder="Введите значение" 
                name='value'
                />
                <Button
                    text="Добавить"
                    type={"submit"}
                    isLoader={animation === 'addItem'}
                    disabled={!inputValue || queue.getQueueLength() === queue.getMaxSize()}
                    extraClass="ml-6"
                />

                <Button
                    text="Удалить"
                    isLoader={animation === 'deleteItem'}
                    disabled={queue.getQueueLength() === 0}
                    extraClass="ml-6"
                    onClick={handleDeleteClick}
                />
                <Button
                    text="Очистить"
                    disabled={queue.getQueueLength() === 0}
                    extraClass="ml-40"
                    onClick={handleClearClick}
                />
            </form>
            <Visualizer elementsForRender={elementsForRender}/>

        </>

    )
}