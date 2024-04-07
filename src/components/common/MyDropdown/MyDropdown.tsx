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
  FC,
  Ref,
} from 'react';
import classnames from 'classnames';

import { MyDropdownProvider } from 'src/contexts/MyDropdownContext';
import { ClickOutsideWrapper } from 'src/components/layout/ClickOutsideWrapper';

type DropdownProps = {
  label?: string;
  triggerType: 'hover' | 'focus';
  onSelect?: (option: string) => void;
  wrapperClassName?: string;
} & PropsWithChildren & InputHTMLAttributes<HTMLInputElement>;

export const MyDropdown: FC<DropdownProps> = ({
  children,
  label,
  triggerType = 'focus',
  className,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  wrapperClassName,
  ...props
}) => {
  const inputRef = useRef<Ref<HTMLInputElement>>(null);
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);

  const handleShowContent = (): void => setIsContentVisible(true);

  const handleHideContent = (): void => setIsContentVisible(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    if (triggerType === 'focus') {
      handleShowContent();
    }

    onFocus?.(e);
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
        child => child.props.children.toLowerCase().includes(String(props.value).toLowerCase()),
      )
      : opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <MyDropdownProvider>
      <div
        className={classnames(wrapperClassName, 'relative w-fit')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input
          {...props}
          ref={inputRef.current}
          onFocus={handleFocus}
          className={classnames(
            className,
            'focus:outline-none p-1.5 rounded-md hover:bg-slate-100 shadow-md', {
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
};
