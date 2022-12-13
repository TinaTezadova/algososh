import React from 'react';
import { ArrayItem } from '../../../types/items';
import { Column } from '../../ui/column/column';
import styles from './styles.module.css';

interface Props {
    elementsForRender: ArrayItem[];
}
export const Visualizer: React.FC<Props> = ({ elementsForRender }) => {

    return (
        <div className={styles.wrapper}>
            {
                elementsForRender.map(({ id, state, value }) => (
                    <Column key={id} state={state} index={Number(value)} extraClass={`mr-5 ${styles.column}`} />
                ))
            }
        </div>

    )
}