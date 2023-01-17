import React from "react";
import styles from "./circle.module.css";
import { ElementStates } from "../../../types/element-states";

interface CircleProps {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = "",
  isSmall,
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`} data-testid={isSmall ? 'circle-small-wrapper' :'circle-wrapper'}>
      <div
        className={`text text_type_input text_color_input mb-4 ${
          styles.absolute
        } ${styles.head} ${
          styles[typeof head === "string" ? "string" : "element"]
        }`}
        data-testid='circle-head-pointer'
      >
        {head}
      </div>
      <div
        className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
          styles[state]
        }`} data-testid='circle'
      >
        <p
          className={`text text_type_circle text_color_input ${styles.letter}`}
          data-testid='circle-text-value'
        >
          {letter}
        </p>
      </div>
      <p
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
        data-testid='circle-index-value'
      >
        {index?.toString()}
      </p>
      <div
        className={`text text_type_input text_color_input mt-4 ${
          styles.absolute
        } ${index?.toString() ? styles.tail60 : styles.tail30} ${
          styles[typeof tail === "string" ? "string" : "element"]
        }`}
        data-testid='circle-tail-pointer'
      >
        {tail}
      </div>
    </div>
  );
};
