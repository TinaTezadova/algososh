import React from 'react';
import { ArrayItem } from '../../../types/items';
import { Circle as UICircle } from '../../ui/circle/circle';
import styles from './styles.module.css';

interface Props {
    elementsForRender: ArrayItem[];
}

export const Visualizer: React.FC<Props> = ({ elementsForRender }) => {

    return (
        <div className={styles.circle}>
            {
                elementsForRender.map((item) => (<UICircle key={item.id} state={item.state} letter={item.value} />))
            }
        </div>

    )
}