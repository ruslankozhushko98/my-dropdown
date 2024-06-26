import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';

import { useMyDropdownContext } from 'src/contexts/MyDropdownContext';

type DropdownOptionProps = {
  value?: string | number;
} & PropsWithChildren & HTMLAttributes<HTMLParagraphElement>;

export const MyDropdownOption: FC<DropdownOptionProps> = ({
  children,
  className,
  value,
  ...props
}) => {
  const { toggleOptionSelected, selectedOptions } = useMyDropdownContext();

  const isSelected: boolean = selectedOptions.includes(String(value));

  const toggleSelected = (): void => toggleOptionSelected(String(value));

  return (
    <p
      className={
        classnames(
          className,
          'cursor-pointer px-1 py-0.5 my-0.5 rounded-sm', {
            ['bg-slate-300 hover:bg-slate-400']: isSelected,
            ['hover:bg-slate-200']: !isSelected,
          },
        )
      }
      {...props}
      onClick={toggleSelected}
    >
      {children}
    </p>
  );
};
