import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useInput } from '@swyx/hooks';

interface MyProps {
  /** label
   * @default ''
   * */
  label?: string;
  onChange?: Function;
  children?: ReactNode;
}

const Styled = styled.label`
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto;
  color: ${(props: { value: string }) => (props.value ? 'green' : 'grey')};

  input {
    text-align: right;
  }
`;
/**
 * number field - has an annoying focus bug in docz : https://codesandbox.io/s/00540zwknn
 */
export default function NumberField(props: MyProps) {
  const { onChange: _onChange, label = '', children } = props;
  const { value, onChange, setValue } = useInput('0', _onChange);

  return (
    <Styled value={value}>
      <span>{label}</span>
      <input min="0" type="number" {...{ value, onChange }} />
      <button onClick={() => setValue('0')}> Reset </button>
      {children}
    </Styled>
  );
}
