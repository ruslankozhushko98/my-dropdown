import { FC } from 'react';

import { useMyDropdownContext } from 'src/contexts/MyDropdownContext';

export const SelectedOptionsList: FC = () => {
  const { selectedOptions, toggleOptionSelected } = useMyDropdownContext();

  if (selectedOptions.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap pt-2 px-1">
      {selectedOptions.map((item, index) => {
        const toggleSelected = (): void => toggleOptionSelected(item);

        return (
          <li
            key={index}
            role={`selected-option-${item}`}
            className="rounded-full bg-blue-300 hover:bg-blue-400 px-1.5 py-1.5 mx-0.5"
          >
            <span
              role={`selected-option-title-${item}`}
              className="text-white mr-1 text-sm"
            >
              {item}
            </span>

            <button
              onClick={toggleSelected}
              role="unselect-btn"
              className="bg-blue-700 px-2 rounded-full"
            >
              <span className="text-white font-lg">
                &times;
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
