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
  ReactNode,
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
  containerClassName?: string;
  openByKey?: string;
  isError?: boolean;
  helperText?: ReactNode | string;
  rightAddon?: ReactNode;
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
  containerClassName,
  onChange,
  openByKey,
  onSelect,
  isError,
  required,
  helperText,
  rightAddon,
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

  const val = props.value || value;

  const options = useMemo(() => {
    const opts = Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child);
      }

      return child;
    });

    return val
      ? opts?.filter(
        child => child.props.children.toLowerCase().includes(String(val).toLowerCase()),
      )
      : opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const customHelperText =
    typeof helperText === 'string'
      ? <p
        className={classnames('text-xs font-medium ml-2.5', {
          ['text-red-500']: isError,
          ['text-slate-500']: !isError,
        })}
      >
        {helperText}
      </p>
      : <>{helperText}</>;

  return (
    <MyDropdownProvider getSelectedOptions={onSelect}>
      <div className={containerClassName} ref={ref}>
        <div
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
              <label className={classnames(
                'absolute left-2.5 top-[-10px] text-sm text-slate-500 font-medium', {
                  ['text-red-500']: isError,
                },
              )}>
                {required ? `${label}*` : label}
              </label>
            )}

            <div className="flex items-center">
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

              {rightAddon && <div className="mr-1">{rightAddon}</div>}
            </div>
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

        {customHelperText}
      </div>
    </MyDropdownProvider>
  );
});
