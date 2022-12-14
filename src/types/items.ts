import { ElementStates } from './element-states';

export type IArrayItem<T = string> = {
  id: string;
  value: T;
  state: ElementStates;
  head?: string | null;
  tail?: string | null;
  gone?: boolean
};

export type SetState = React.Dispatch<React.SetStateAction<IArrayItem[]>>;

export interface ListNode<T> {
  id: string;
  state: ElementStates;
  next: ListNode<T> | null;
  value: T;
};