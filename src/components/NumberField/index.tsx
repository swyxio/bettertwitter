import React, { ReactNode } from 'react';
import { useInput } from '@swyx/hooks';

interface MyProps {
  /** label
   * @default ''
   * */
  label?: string;
  onChange?: Function;
  children?: ReactNode;
}

/**
 * number field - has an annoying focus bug in docz : https://codesandbox.io/s/00540zwknn
 */
export default function NumberField(props: MyProps) {
  const { onChange: _onChange, label = '', children } = props;
  const { value, onChange, setValue } = useInput('0', _onChange);

  return (
    // has value -> green otherwise grey
    <label>
      <span>{label}</span>
      <input min="0" type="number" {...{ value, onChange }} />
      <button onClick={() => setValue('0')}> Reset </button>
      {children}
    </label>
  );
}
