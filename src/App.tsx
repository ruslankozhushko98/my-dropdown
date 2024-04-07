import { MyDropdown, MyDropdownOption } from './components/common/MyDropdown';

function App() {
  return (
    <div className="p-4">
      <MyDropdown
        label="Label"
        placeholder="Enter value"
        triggerType="focus"
        openByKey="Enter"
        onSelect={console.log}
      >
        <MyDropdownOption value="cat">
          Cat
        </MyDropdownOption>

        <MyDropdownOption value="dog">
          Dog
        </MyDropdownOption>

        <MyDropdownOption value="duck">
          Duck
        </MyDropdownOption>

        <MyDropdownOption value="bird">
          Bird
        </MyDropdownOption>
      </MyDropdown>
    </div>
  );
}

export default App;
