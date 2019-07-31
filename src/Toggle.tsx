import React from 'react';

interface ToggleProps {
  children: React.ReactNode;
  onClick: (nextState: boolean) => void;
  isOn: boolean;
}
function Toggle({ children, onClick, isOn }: ToggleProps) {
  return (
    // color is green when isOn is true else is blue
    <div>
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
export default Toggle;
