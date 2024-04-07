import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type ContextProps = {
  selectedOptions: Array<string>;
  toggleOptionSelected: (option: string) => void;
};

const MyDropdownContext = createContext<ContextProps | null>(null);

export const MyDropdownProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

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
    throw new Error('MyDropdownItem component must be used the only inside of MyDropdown component!');
  }

  return context;
};
