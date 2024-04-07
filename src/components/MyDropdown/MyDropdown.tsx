import {
  Children,
  FC,
  FocusEvent,
  InputHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useState,
  useMemo,
} from 'react';
import classnames from 'classnames';

import { MyDropdownProvider } from 'src/contexts/MyDropdownContext';

type DropdownProps = {
  label?: string;
  triggerType: 'hover' | 'focus';
  onSelect?: (option: string) => void;
} & PropsWithChildren & InputHTMLAttributes<HTMLInputElement>;

export const MyDropdown: FC<DropdownProps> = ({
  children,
  label,
  triggerType = 'focus',
  className,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  const handleShowContent = (): void => setIsContentVisible(true);

  const handleHideContent = (): void => setIsContentVisible(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (triggerType === 'focus') {
      handleShowContent();
    }

    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    if (triggerType === 'focus') {
      handleHideContent();
    }

    onBlur?.(e);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLInputElement>): void => {
    if (triggerType === 'hover') {
      handleShowContent();
    }

    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLInputElement>): void => {
    if (triggerType === 'hover') {
      handleHideContent();
    }

    onMouseLeave?.(e);
  };

  const opts = Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child);
    }

    return child;
  });

  const options = useMemo(() => {
    return props.value
      ? opts?.filter(
        child => child.props.value.toLowerCase().includes(String(props.value).toLowerCase()),
      )
      : opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <MyDropdownProvider>
      <div className="relative w-fit">
        <input
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classnames(
            className,
            'border-2 p-1.5 rounded-md hover:bg-slate-100', {
              ['bg-slate-100']: isContentVisible,
              ['bg-slate-50']: !isContentVisible,
            },
          )}
        />

        {label && (
          <label className="absolute left-2.5 top-[-10px] text-sm text-slate-500 font-medium">
            {label}
          </label>
        )}

        {isContentVisible && (
          <div className="absolute bg-slate-100 py-2 px-1 mt-1 rounded-md shadow-md w-full z-10">
            {options}
          </div>
        )}
      </div>
    </MyDropdownProvider>
  );
};
