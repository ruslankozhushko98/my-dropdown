import { ChangeEvent, useState } from 'react';

import { MyDropdown, MyDropdownItem } from './components/MyDropdown';

function App() {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div className="p-4">
      <MyDropdown
        label="Label"
        placeholder="Enter value"
        triggerType="focus"
        value={value}
        onChange={handleChange}
      >
        <MyDropdownItem value="option-1">
          Option 1
        </MyDropdownItem>

        <MyDropdownItem value="option-2">
          Option 2
        </MyDropdownItem>
      </MyDropdown>
    </div>
  );
}

export default App;
