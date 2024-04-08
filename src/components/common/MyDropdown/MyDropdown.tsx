/* eslint-disable max-lines */
import {
  Children,
  FocusEvent,
  InputHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useState,
  useMemo,
  useRef,
  useEffect,
  forwardRef,
  ChangeEvent,
} from 'react';
import classnames from 'classnames';

import { MyDropdownProvider } from 'src/contexts/MyDropdownContext';
import { ClickOutsideWrapper } from 'src/components/layout/ClickOutsideWrapper';
import { SelectedOptionsList } from './SelectedOptionsList';

type DropdownProps = {
  label?: string;
  triggerType: 'hover' | 'focus';
  onSelect?: (options: Array<string>) => void;
  wrapperClassName?: string;
  openByKey?: string;
  isError?: boolean;
} & PropsWithChildren & InputHTMLAttributes<HTMLInputElement>;

export const MyDropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  children,
  label,
  triggerType = 'focus',
  className,
  onFocus,
  onMouseMove,
  onMouseLeave,
  wrapperClassName,
  onChange,
  openByKey,
  onSelect,
  isError,
  required,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    const handlePressEnter = (e: KeyboardEvent): void => {
      if (e.key === openByKey) {
        setIsContentVisible(true);

        if (isContentVisible) {
          inputRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handlePressEnter);

    return () => {
      document.addEventListener('keydown', handlePressEnter);
    };
  }, [isContentVisible, openByKey]);

  const handleShowContent = (): void => setIsContentVisible(true);

  const handleHideContent = (): void => setIsContentVisible(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (triggerType === 'focus') {
      handleShowContent();
    }

    onFocus?.(e);
  };

  const handleMouseMove = (e: MouseEvent<HTMLInputElement>): void => {
    if (triggerType === 'hover') {
      handleShowContent();
    }

    onMouseMove?.(e);
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

  const val = props.value || value;

  const options = useMemo(() => {
    return val
      ? opts?.filter(
        child => child.props.children.toLowerCase().includes(String(val).toLowerCase()),
      )
      : opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, val]);

  return (
    <MyDropdownProvider getSelectedOptions={onSelect}>
      <div
        ref={ref}
        className={classnames(wrapperClassName, 'relative w-fit hover:bg-slate-100 shadow-md', {
          ['bg-red-50 hover:bg-red-100']: isError,
          ['bg-slate-100']: isContentVisible && !isError,
          ['bg-slate-50']: !isContentVisible && !isError,
        })}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <SelectedOptionsList />

          {label && (
            <label className="absolute left-2.5 top-[-10px] text-sm text-slate-500 font-medium">
              {required ? `${label}*` : label}
            </label>
          )}

          <input
            {...props}
            required
            value={val}
            onChange={handleChange}
            ref={inputRef}
            onFocus={handleFocus}
            className={classnames(
              className,
              'focus:outline-none p-1.5 rounded-md bg-inherit',
            )}
          />
        </div>

        {isContentVisible && (
          <div className="absolute pt-1 w-full z-10">
            <div className="bg-slate-100 py-2 px-1 rounded-md shadow-md">
              <ClickOutsideWrapper onClickOutside={handleHideContent} excludeRefs={[inputRef]}>
                {options?.length === 0 ? <p>No items found!</p> : <>{options}</>}
              </ClickOutsideWrapper>
            </div>
          </div>
        )}
      </div>
    </MyDropdownProvider>
  );
});
