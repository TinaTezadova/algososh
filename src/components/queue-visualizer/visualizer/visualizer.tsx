import React from 'react';
import { Circle } from '../../ui/circle/circle';
import { ArrayItem } from '../../../types/items';
import styles from './styles.module.css';

interface Props {
    elementsForRender: ArrayItem[];
}
export const Visualizer: React.FC<Props> = ({elementsForRender}) => {

    return (
        <div className={styles.wrapper}>
            {elementsForRender.map(({id, value, state, tail, head}, index) => (
                <Circle key={id} letter={value} index={index} state={state} tail={tail} head={head} extraClass={`${styles.circle} mr-8`}/>
            ))}
        </div>

    )


}