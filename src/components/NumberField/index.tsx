import React, { ReactNode } from 'react';
import { useInput } from '@swyx/hooks';

interface MyProps {
  /** label
   * @default ''
   * */
  label?: string;
  onChange?: Function;
  children?: ReactNode;
  fieldName: string;
}

/**
 * number field - has an annoying focus bug in docz : https://codesandbox.io/s/00540zwknn
 */
export default function NumberField(props: MyProps) {
  const { onChange: _onChange, label = '', children, fieldName } = props;
  const { value, onChange, setValue } = useInput('0', _onChange);

  return (
    // has value -> green otherwise grey
    <>
      <label labelfor={fieldName}>{label}</label>
      <input id={fieldName} min="0" type="number" {...{ value, onChange }} />
      <div className="form-control-extras">
        <button onClick={() => setValue('0')}> Reset </button>
        {children}
      </div>
    </>
  );
}
