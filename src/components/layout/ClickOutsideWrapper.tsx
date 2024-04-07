import { FC, PropsWithChildren, Ref, useEffect, useRef } from 'react';

type Props = {
  onClickOutside: () => void;
  excludeRefs: Array<Ref<unknown>>;
} & PropsWithChildren;

export const ClickOutsideWrapper: FC<Props> = ({ children, onClickOutside, excludeRefs }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      let isExcluded = false;

      for (const ref of excludeRefs) {
        if (ref?.current && ref?.current.contains(event.target)) {
          isExcluded = true;
          break;
        }
      }

      if (!isExcluded) {
        handleClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};
