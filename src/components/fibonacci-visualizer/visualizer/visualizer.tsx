import React from 'react';
import { IArrayItem } from '../../../types/items';
import { Circle } from '../../ui/circle/circle';
import styles from './styles.module.css'

interface Props {
    elementsForRender: IArrayItem<number>[];
}

export const Visualizer: React.FC<Props> = ({ elementsForRender }) => {

    return (
        <div className={styles.wrapper}>
            {
                elementsForRender.map(({id, value}, idx) => (
                    <Circle key={id} index={idx} letter={String(value)} extraClass={`${styles.circle} ml-8`}/>

                ))
            }
        </div>

    )
}