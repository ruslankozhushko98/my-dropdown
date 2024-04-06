import { FC, PropsWithChildren, SelectHTMLAttributes, createContext, useContext } from 'react';

type ContextProps = {
  array: [],
};

const MyDropdownContext = createContext<ContextProps | null>(null);

const useMyDropdownContext = () => {
  const context = useContext(MyDropdownContext);

  if (!context) {
    throw new Error('MyDropdownItem component must be used the only inside of MyDropdown component!');
  }

  return context;
};

type DropdownProps = {
  label?: string;
} & PropsWithChildren & SelectHTMLAttributes<HTMLSelectElement>;

export const MyDropdown: FC<DropdownProps> = ({ children, label, ...props }) => {
  return (
    <MyDropdownContext.Provider value={{ array: [] }}>
      <select {...props}>
        {children}
      </select>
    </MyDropdownContext.Provider>
  );
};

type DropdownItemProps = {
  value?: string | number;
} & PropsWithChildren & SelectHTMLAttributes<HTMLOptionElement>;

export const MyDropdownItem: FC<DropdownItemProps> = ({ children, value }) => {
  const myDropdownContext = useMyDropdownContext();

  return (
    <option value={value}>
      {children}
    </option>
  );
};
