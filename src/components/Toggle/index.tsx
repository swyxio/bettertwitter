import React from 'react';

interface ToggleProps {
  children: React.ReactNode;
  onClick: (nextState: boolean) => void;
  isOn: boolean;
}
function Toggle({ children, onClick, isOn }: ToggleProps) {
  return (
    // color is green when isOn is true else is blue
    <div className="toggle">
      <label
        for="iHopeThisIsTheOnlyToggle"
      >
        {
          // looks like this is the label so ¯\_(ツ)_/¯
          children
        }
      </label>
      <input
        id="iHopeThisIsTheOnlyToggle"
        type="checkbox"
        checked={isOn}
        onClick={() => onClick(!isOn)}
        readOnly
      />
    </div>
  );
}
export default Toggle;
