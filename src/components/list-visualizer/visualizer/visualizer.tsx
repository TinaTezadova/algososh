import React from 'react';
import { ElementStates } from '../../../types/element-states';
import { IArrayItem } from '../../../types/items';
import { Circle } from '../../ui/circle/circle';
import { ArrowIcon } from '../../ui/icons/arrow-icon';
import styles from './styles.module.css';

interface Props {
    elementsForRender: IArrayItem[];
}

export const Visualizer: React.FC<Props> = ({ elementsForRender }) => {
    const renderTail = (value: string | null) => {

        if (value && value !== 'tail') {
            return (
                <Circle letter={value} state={ElementStates.Changing} isSmall />
            )

        }
        return value;

    };

    const renderHead = (value: string | null) => {

        if (value && (value !== 'head')) {
            return (
                <Circle letter={value} state={ElementStates.Changing} isSmall />
            )

        }
        return value;

    }

    return (
        <ul className={styles.list}>
            {
                elementsForRender.map((item, index, array) => {
                    return (
                        <li key={item.id} className={styles.listItem}>
                            <Circle index={index} state={item.state} letter={item.value} tail={renderTail(item.tail || null)} head={renderHead(item.head || null)} extraClass={`${styles.circle} ml-8 mr-8`} />
                            {index !== array.length - 1 && (
                                <ArrowIcon fill={item.gone ? '#D252E1' : '#0032FF'} />
                            )}

                        </li>
                    )
                })
            }
        </ul>
    )


}