import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { MyDropdown, MyDropdownOption } from 'src/components/common/MyDropdown';

const DropdownContent = () => (
  <MyDropdownOption value="cat">
    Cat
  </MyDropdownOption>
);

const dropdownProps = {
  label: 'Label',
  name: 'label',
  placeholder: 'Enter value',
  openByKey: 'Enter',
  onSelect: console.log,
};

const FocusingDropdown = () => (
  <MyDropdown
    {...dropdownProps}
    triggerType="focus"
  >
    <DropdownContent />
  </MyDropdown>
);

const HoveringDropdown = () => (
  <MyDropdown
    {...dropdownProps}
    triggerType="hover"
  >
    <DropdownContent />
  </MyDropdown>
);

describe('MyDropdown', () => {
  it('opens when input is focused', () => {
    const { queryByRole } = render(<FocusingDropdown />);

    fireEvent.focus(screen.getByRole('dropdown-input'));

    expect(queryByRole('options-list')).toBeTruthy();
  });

  it('opens when input is hovered and closes when input is unhovered', () => {
    const { queryByRole } = render(<HoveringDropdown />);

    fireEvent.mouseMove(screen.getByRole('dropdown-input'));
    expect(queryByRole('options-list')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByRole('dropdown-input'));
    expect(queryByRole('options-list')).not.toBeInTheDocument();
  });

  it('opens by clicking Enter key', () => {
    const { queryByRole } = render(<FocusingDropdown />);

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(queryByRole('options-list')).toBeInTheDocument();
  });
});
