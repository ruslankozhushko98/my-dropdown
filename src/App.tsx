import { ChangeEvent, useState } from 'react';

import { MyDropdown, MyDropdownItem } from './components/common/MyDropdown';

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
        <MyDropdownItem value="asd-1">
          Asd 1
        </MyDropdownItem>

        <MyDropdownItem value="qwe-2">
          Qwe 2
        </MyDropdownItem>
      </MyDropdown>
    </div>
  );
}

export default App;
