import React, { useMemo, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { reversing } from './utils';
import { Visualizer } from './visualizer/visualizer';
import styles from './styles.module.css';
import { IArrayItem } from '../../types/items';
import { useForm, IUseFormResult } from '../../hooks/use-form';

export const StringVisualizer: React.FC = () => {
    const { values, handleChange }: IUseFormResult = useForm({ text: ''});
    const [elementsForRender, setElementsForRender] = useState<IArrayItem[]>([]);
    const [animation, setAnimation] = useState<boolean>(false);

    const inputValue = useMemo(() => {
        return values.text
    }, [values.text]);

    const handleReverseString = async (event: React.FormEvent) => {
        event.preventDefault();
        const value = inputValue.trim();
        if (value) {
            setAnimation(true);
            setElementsForRender(await reversing(value, setElementsForRender));
            setAnimation(false);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleReverseString}>
                <Input
                    value={inputValue}
                    spellCheck={false}
                    maxLength={11}
                    extraClass={`${styles.input} mr-6`}
                    onChange={handleChange}
                    disabled={animation}
                    isLimitText
                    name='text'
                />
                <Button
                    text="Развернуть"
                    type="submit"
                    isLoader={animation}
                    extraClass={styles.button}
                    disabled={animation || !inputValue}
                />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>
    )
}