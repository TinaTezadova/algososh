import React from 'react';
import { ArrayItem } from '../../../types/items';
import { Circle } from '../../ui/circle/circle';
import styles from './styles.module.css';

interface Props {
    elementsForRender: ArrayItem[];
}

export const Visualizer: React.FC<Props> = ({elementsForRender}) => {

    return (
        <div className={styles.wrapper}>
            {
                elementsForRender.map((item, index, array) => (
                    <Circle state={item.state} key={item.id} letter={item.value} index={index} head={array.length - 1 === index ? 'top' : null} extraClass={`${styles.circle} mr-8`}/>
                ))
            }

        </div>
    )
}