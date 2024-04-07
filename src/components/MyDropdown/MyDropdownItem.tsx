import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';

import { useMyDropdownContext } from 'src/contexts/MyDropdownContext';

type DropdownItemProps = {
  value?: string | number;
} & PropsWithChildren & HTMLAttributes<HTMLElement>;

export const MyDropdownItem: FC<DropdownItemProps> = ({
  children,
  className,
  ...props
}) => {
  const myDropdownContext = useMyDropdownContext();

  return (
    <p
      className={
        classnames(
          className,
          'hover:bg-slate-200 cursor-pointer px-1 py-0.5 my-0.5 rounded-sm',
        )
      }
      {...props}
    >
      {children}
    </p>
  );
};
