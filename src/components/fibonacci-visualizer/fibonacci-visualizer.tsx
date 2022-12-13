import React, { useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './styles.module.css';
import { getFibonacci } from './utils';
import { delay } from '../../utils/utils';
import { Visualizer } from './visualizer/visualizer';
import { ArrayItem } from '../../types/items';

export const FibonacciVisualizer = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [elementsForRender, setElementsForRender] = useState<ArrayItem<number>[]>([]);
    const [animation, setAnimation] = useState<boolean>(false);
    const isButtonDisabled = useMemo((): boolean => {
        return inputValue === '' || Number(inputValue) < 1 || Number(inputValue) > 19
    }, [inputValue]);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value)
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setAnimation(true);
		setElementsForRender([]);
		const array = getFibonacci(Number(inputValue)); 
		for (let i = 0; i < array.length; i++) {
			setElementsForRender((prev: any) => [...prev, array[i]]);
			await delay(500);
		}
		setAnimation(false);

    }

    return (
        <>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <Input
                    value={inputValue}
                    type="number"
                    placeholder="Введите число"
                    min={1}
                    max={19}
                    maxLength={1}
                    onChange={handleInputChange}
                    isLimitText
                    extraClass={`${styles.input} mr-6`}
                    disabled={animation}
                />
                <Button
                    text="Рассчитать"
                    type="submit"
                    isLoader={animation}
                    extraClass={styles.button}
                    disabled={isButtonDisabled}
                />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>
    )
}