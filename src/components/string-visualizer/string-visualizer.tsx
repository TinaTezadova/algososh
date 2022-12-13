import React, { useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { reversing } from './utils';
import { Visualizer } from './visualizer/visualizer';
import styles from './styles.module.css';
import { ArrayItem } from '../../types/items';

export const StringVisualizer: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [elementsForRender, setElementsForRender] = useState<ArrayItem[]>([]);
    const [animation, setAnimation] = useState<boolean>(false);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setInputValue(event.currentTarget.value)
    };

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
                    onChange={handleInputChange}
                    disabled={animation}
                    isLimitText
                />
                <Button
                    text="Развернуть"
                    type="submit"
                    isLoader={animation}
                    extraClass={styles.button}
                />
            </form>
            <Visualizer elementsForRender={elementsForRender} />
        </>
    )
}