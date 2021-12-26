import { useEffect, useState } from 'react';

const filterAndOrderOptions = (options, filter) => {
  const fixedFilter = filter.trim().toLowerCase();

  if (!fixedFilter) return options;

  const exactMatch = options.filter(
    (element) => element.value.toLowerCase() === fixedFilter.toLowerCase()
  );

  const startingWith = options.filter((element) =>
    element.value.toLowerCase().startsWith(fixedFilter.toLowerCase())
  );

  const textIncludes = options.filter((element) =>
    element.value.toLowerCase().includes(fixedFilter.toLowerCase())
  );

  return [...exactMatch, ...startingWith, ...textIncludes];
};

const SearchList = ({ value, options, placeholder, onSelect }) => {
  /* TODO:
  - Add debouncer
  - Add message when there's more results than the slice
  - Add custom slice value
  - Add minimum of input length to start searching
  */
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const changeHandler = (event) => {
    const input = event.target.value;
    setInputValue(input);
    setFilter(input);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      <input
        value={inputValue}
        type="search"
        placeholder={placeholder}
        onChange={changeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      {focused && (
        <ul>
          {filterAndOrderOptions(options, filter)
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
