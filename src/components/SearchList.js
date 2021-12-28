import { useEffect, useMemo, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { filterAndOrderByAccuracy } from '../utils';

const SearchList = ({
  value,
  options,
  placeholder,
  maxItems = 10,
  onSelect,
}) => {
  /* TODO:
  - Ignore accents when searching
  - Consider removing maxItems completely, and instead add vertical overflow and a maximum size.
    Searches with too many results should be minimized with the minimum search length of 3.
  */
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredAndOrderedOptions = useMemo(() => {
    const fixedFilter = filter.trim().toLowerCase();

    if (!fixedFilter || fixedFilter.length < 3) {
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
      <DebounceInput
        value={inputValue}
        type="search"
        placeholder={placeholder}
        debounceTimeout={300}
        onChange={changeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></DebounceInput>
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
