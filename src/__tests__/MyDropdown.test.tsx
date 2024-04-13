import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { nextTick } from 'process';

import { MyDropdown, MyDropdownOption } from 'src/components/common/MyDropdown';

const DropdownContent = () => (
  <>
    <MyDropdownOption value="cat">
      Cat
    </MyDropdownOption>

    <MyDropdownOption value="duck">
      Duck
    </MyDropdownOption>
  </>
);

const dropdownProps = {
  label: 'Label',
  name: 'label',
  placeholder: 'Enter value',
  openByKey: 'Enter',
  onSelect: console.log,
};

export const TestDropdown = () => (
  <MyDropdown {...dropdownProps}>
    <DropdownContent />
  </MyDropdown>
);

const TestHoveringDropdown = () => (
  <MyDropdown
    {...dropdownProps}
    triggerType="hover"
  >
    <DropdownContent />
  </MyDropdown>
);

describe('MyDropdown', () => {
  it('opens when input is focused and closes by click outside', () => {
    const { queryByRole } = render(<TestDropdown />);

    fireEvent.focus(screen.getByRole('dropdown-input'));
    expect(queryByRole('options-list')).toBeInTheDocument();

    fireEvent.click(document.body);
    nextTick(() => {
      expect(queryByRole('options-list')).not.toBeInTheDocument();
    });
  });

  it('opens when input is hovered and closes when input is unhovered', () => {
    const { queryByRole } = render(<TestHoveringDropdown />);

    fireEvent.mouseMove(screen.getByRole('dropdown-input'));
    expect(queryByRole('options-list')).toBeInTheDocument();

    fireEvent.mouseLeave(screen.getByRole('dropdown-input'));
    expect(queryByRole('options-list')).not.toBeInTheDocument();
  });

  it('opens by clicking Enter key', () => {
    const { queryByRole } = render(<TestDropdown />);

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(queryByRole('options-list')).toBeInTheDocument();
  });
});
