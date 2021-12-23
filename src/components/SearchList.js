import { useState } from 'react';

const SearchList = ({ value, options, placeholder, onSelect }) => {
  /* TODO:
  - Add debouncer
  - Add message when there's more results than the slice
  - Add custom slice value
  - Add minimum of input length to start searching
  */
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);

  const inputHandler = (e) => {
    setFilter(e.target.value.toLowerCase());
  };
  return (
    <>
      <input
        value={value}
        type="search"
        placeholder={placeholder}
        onChange={inputHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      {focused && (
        <ul>
          {options
            .filter(
              (element) =>
                !filter ||
                element.value.toLowerCase().includes(filter) ||
                element.label.toLowerCase().includes(filter)
            )
            .slice(0, 10)
            .map(
              (element) =>
                element.value && (
                  <li key={element.value} onMouseDown={() => onSelect(element)}>
                    {element.label}
                  </li>
                )
            )}
        </ul>
      )}
    </>
  );
};

export default SearchList;
