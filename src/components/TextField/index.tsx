import React, { ReactNode } from 'react';

interface MyProps {
  /** label of the input
   * @default ''
   * */
  label?: string;
  fieldName?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invalidWarning?: string | JSX.Element;
  children?: ReactNode;
}

/**
 * Filter field
 */
export default function TextField(props: MyProps) {
  const {
    fieldName,
    label = '',
    placeholder,
    value,
    onChange,
    invalidWarning,
    children
  } = props;

  return (
    <div>
      {invalidWarning}
      {/** 
        * this label is red when it is invalid and blue when is valid 
        * and isInvalid={!!invalidWarning}
        */}
      <label>
        <span>
          {label} {fieldName && fieldName + ':'}
        </span>
        <input value={value} onChange={onChange} placeholder={placeholder} />
        {children}
      </label>
    </div>
  );
}
