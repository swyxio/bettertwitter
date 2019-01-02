import React from 'react';
import styled from 'styled-components';

interface ToggleProps {
  className?: string;
  children: React.ReactNode;
  onClick: (nextState: boolean) => void;
  isOn: boolean;
}
function Toggle({ className, children, onClick, isOn }: ToggleProps) {
  return (
    <div className={className}>
      <label>
        <input
          type="checkbox"
          checked={isOn}
          onClick={() => onClick(!isOn)}
          readOnly
        />
        {children}
      </label>
    </div>
  );
}
export default styled(Toggle)`
  padding: 10px;
  display: inline-flex;
  color: ${(props: { isOn: boolean }) => (props.isOn ? 'green' : 'blue')};
`;
