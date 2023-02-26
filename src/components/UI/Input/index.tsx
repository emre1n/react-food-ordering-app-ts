import React, { LegacyRef } from 'react';

import styles from './styles.module.css';

type TInput = {
  input: {
    id: string;
    type: string;
    min: string;
    max: string;
    step: string;
    defaultValue: string;
  };
  label: string;
};

const Input = React.forwardRef(
  ({ input, label }: TInput, ref: LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <div className={styles.input}>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input} />
      </div>
    );
  }
);

export default Input;
