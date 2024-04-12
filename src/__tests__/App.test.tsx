import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { App } from 'src/App';
import { MyDropdown, MyDropdownOption } from 'src/components/common/MyDropdown';

const DropdownContent = () => (
  <MyDropdownOption value="cat">
    Cat
  </MyDropdownOption>
);

const FocusingDropdown = () => (
  <MyDropdown
    label="Label"
    name="label"
    placeholder="Enter value"
    triggerType="focus"
    openByKey="Enter"
    onSelect={console.log}
  >
    <DropdownContent />
  </MyDropdown>
);

const HoveringDropdown = () => (
  <MyDropdown
    label="Label"
    name="label"
    placeholder="Enter value"
    triggerType="hover"
    openByKey="Enter"
    onSelect={console.log}
  >
    <DropdownContent />
  </MyDropdown>
);

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});

describe('MyDropdown', () => {
  it('opens when input is focused', () => {
    render(<FocusingDropdown />);

    fireEvent.focus(screen.getByRole('dropdown-input'));

    expect(screen.getByRole('options-list')).toBeTruthy();
  });

  it('opens when input is hovered', () => {
    render(<HoveringDropdown />);

    fireEvent.mouseMove(screen.getByRole('dropdown-input'));

    expect(screen.getByRole('options-list')).toBeInTheDocument();
  });

  it('closes when input is unhovered', () => {
    const { queryByRole } = render(<HoveringDropdown />);

    fireEvent.mouseLeave(screen.getByRole('dropdown-input'));

    expect(queryByRole('options-list')).not.toBeInTheDocument();
  });
});
