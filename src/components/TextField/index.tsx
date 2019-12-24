import React, { ReactNode } from 'react';

interface MyProps {
  /** label of the input
   * @default ''
   * */
  label?: string;
  inputSize?: 'expand';
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
    children,
    inputSize = '',
  } = props;

  return (
    <>
      {invalidWarning}
      {/** 
        * this label is red when it is invalid and blue when is valid 
        * and isInvalid={!!invalidWarning}
        */}
      {
        label && <label labelfor={fieldName}>
          {label}
        </label>
      }
      <input className={inputSize} id={fieldName} value={value} onChange={onChange} placeholder={placeholder} />
      <div className="form-control-extras">{children}</div>
    </>
  );
}
