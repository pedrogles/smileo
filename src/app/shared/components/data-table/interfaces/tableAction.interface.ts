export interface TableAction<T> {
  id: string;

  icon: string;

  label: string;

  color?: 'primary' | 'accent' | 'warn';

  tooltip?: string;

  callback?: (row: T) => void;

  hidden?: (row: T) => boolean;

  disabled?: (row: T) => boolean;
}