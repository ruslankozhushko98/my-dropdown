import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type ContextProps = {
  selectedOptions: Array<string>;
  toggleOptionSelected: (option: string) => void;
};

const MyDropdownContext = createContext<ContextProps | null>(null);

type Props = {
  getSelectedOptions?: (options: Array<string>) => void;
} & PropsWithChildren;

export const MyDropdownProvider: FC<Props> = ({ children, getSelectedOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

  useEffect(() => {
    getSelectedOptions?.(selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const toggleOptionSelected = (option: string): void => {
    if (selectedOptions.includes(option)) {
      const filteredOptions = selectedOptions.filter(item => item !== option);
      setSelectedOptions(filteredOptions);
    } else {
      setSelectedOptions([
        ...selectedOptions,
        option,
      ]);
    }
  };

  const value: ContextProps = {
    selectedOptions,
    toggleOptionSelected,
  };

  return (
    <MyDropdownContext.Provider value={value}>
      {children}
    </MyDropdownContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyDropdownContext = () => {
  const context = useContext(MyDropdownContext);

  if (!context) {
    throw new Error('MyDropdownOption component must be used the only inside of MyDropdown component!');
  }

  return context;
};
