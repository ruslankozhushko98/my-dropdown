import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { nextTick } from 'process';

import { MyDropdown, MyDropdownOption } from 'src/components/common/MyDropdown';

const DropdownContent = () => (
  <>
    <MyDropdownOption role="cat-option" value="cat">
      Cat
    </MyDropdownOption>

    <MyDropdownOption role="duck-option" value="duck">
      Duck
    </MyDropdownOption>

    <MyDropdownOption role="rat-option" value="rat">
      Rat
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

const clickOnOption = (): void => {
  fireEvent.click(screen.getByRole('duck-option'));
};

const openDropdownByFocus = () => {
  const result = render(<TestDropdown />);

  fireEvent.focus(screen.getByRole('dropdown-input'));
  expect(result.queryByRole('options-list')).toBeInTheDocument();

  return result;
};

describe('MyDropdown focus', () => {
  it('opens when input is focused and closes by click outside', () => {
    const { queryByRole } = openDropdownByFocus();

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

  it('can select/unselect options by click on it', () => {
    const { queryByRole } = openDropdownByFocus();

    clickOnOption();

    expect(queryByRole('selected-option-duck')).toBeInTheDocument();

    clickOnOption();

    expect(queryByRole('selected-option-duck')).not.toBeInTheDocument();
  });

  it('can unselect by click on remove button', () => {
    const { queryByRole } = openDropdownByFocus();

    clickOnOption();

    fireEvent.click(screen.getByRole('unselect-btn'));
    expect(queryByRole('selected-option-duck')).not.toBeInTheDocument();
  });
});
