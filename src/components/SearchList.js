import { useEffect, useMemo, useState } from 'react';
import { filterAndOrderByAccuracy } from '../utils';

const SearchList = ({
  value,
  options,
  placeholder,
  maxItems = 10,
  onSelect,
}) => {
  /* TODO:
  - Add debouncer
  - Add message when there's more results than the slice
  - Add minimum of input length to start searching
  */
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredAndOrderedOptions = useMemo(() => {
    const fixedFilter = filter.trim().toLowerCase();

    if (!fixedFilter) {
      return options;
    }

    const result = filterAndOrderByAccuracy(options, fixedFilter);

    return result.slice(0, maxItems);
  }, [options, filter, maxItems]);

  const changeHandler = (event) => {
    const input = event.target.value;
    setInputValue(input);
    setFilter(input);

    if (input === '') {
      onSelect(null);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="wrapper" style={{ border: '1px solid red' }}>
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
          {filteredAndOrderedOptions.slice(0, maxItems).map(
            (element) =>
              element.value && (
                <li key={element.value} onMouseDown={() => onSelect(element)}>
                  {element.label}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchList;
