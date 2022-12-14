import React, { useMemo, useState } from 'react';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import styles from './styles.module.css';
import { getFibonacci } from './utils';
import { delay } from '../../utils/utils';
import { Visualizer } from './visualizer/visualizer';
import { IArrayItem } from '../../types/items';
import { useForm, IUseFormResult } from '../../hooks/use-form';

export const FibonacciVisualizer = () => {
    const { values, handleChange }: IUseFormResult = useForm({number: ''});
    const [elementsForRender, setElementsForRender] = useState<IArrayItem<number>[]>([]);
    const [animation, setAnimation] = useState<boolean>(false);
    const inputValue = useMemo(() => {
        return values.number
    }, [values.number]);

    const isButtonDisabled = useMemo((): boolean => {
        return inputValue === '' || Number(inputValue) < 1 || Number(inputValue) > 19
    }, [inputValue]);

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setAnimation(true);
		setElementsForRender([]);
		const array = getFibonacci(Number(inputValue)); 
		for (let i = 0; i < array.length; i++) {
			setElementsForRender((prev: IArrayItem<number>[]) => [...prev, array[i]]);
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
                    onChange={handleChange}
                    isLimitText
                    extraClass={`${styles.input} mr-6`}
                    disabled={animation}
                    name='number'
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