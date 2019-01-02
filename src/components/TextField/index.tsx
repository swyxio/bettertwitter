import React, { ReactNode } from 'react';
import styled from 'styled-components';

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

const Styled = styled.label`
  padding: 10px;
  display: flex;
  color: ${(props: { isInvalid?: boolean }) =>
    props.isInvalid ? 'red' : 'blue'};
  input {
    margin-right: 10px;
  }
`;
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
      <Styled isInvalid={!!invalidWarning}>
        <span>
          {label} {fieldName && fieldName + ':'}
        </span>
        <input value={value} onChange={onChange} placeholder={placeholder} />
        {children}
      </Styled>
    </div>
  );
}
