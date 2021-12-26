import { useEffect, useMemo, useState } from 'react';

const SearchList = ({
  value,
  options,
  placeholder,
  displayLength = 10,
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
  const [ellipsisFlag, setEllipsisFlag] = useState(false);

  const filteredAndOrderedOptions = useMemo(() => {
    const fixedFilter = filter.trim().toLowerCase();

    if (!fixedFilter) {
      setEllipsisFlag(options.length > displayLength);
      return options;
    }

    const mergedWithoutDuplicates = [];

    const exactMatch = options.find(
      (element) => element.value.toLowerCase() === fixedFilter.toLowerCase()
    );

    if (exactMatch) {
      mergedWithoutDuplicates.push(exactMatch);
    }

    options.forEach((element) => {
      if (
        !mergedWithoutDuplicates.find((el) => el.value === element.value) &&
        element.value.toLowerCase().startsWith(fixedFilter.toLowerCase())
      ) {
        mergedWithoutDuplicates.push(element);
      }
    });

    options.forEach((element) => {
      if (
        !mergedWithoutDuplicates.find((el) => el.value === element.value) &&
        element.value.toLowerCase().includes(fixedFilter.toLowerCase())
      ) {
        mergedWithoutDuplicates.push(element);
      }
    });

    if (mergedWithoutDuplicates.length > displayLength) {
      setEllipsisFlag(true);
    }

    return mergedWithoutDuplicates.slice(0, displayLength);
  }, [options, filter, displayLength]);

  const changeHandler = (event) => {
    const input = event.target.value;
    setInputValue(input);
    setFilter(input);
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
          {filteredAndOrderedOptions.slice(0, displayLength).map(
            (element) =>
              element.value && (
                <li key={element.value} onMouseDown={() => onSelect(element)}>
                  {element.label}
                </li>
              )
          )}
          {ellipsisFlag && <li>···</li>}
        </ul>
      )}
    </div>
  );
};

export default SearchList;
