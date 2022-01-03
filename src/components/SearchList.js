import { useEffect, useMemo, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Fuse from 'fuse.js';

const searchOptions = {
  threshold: 0.35,
  keys: ['value'],
};

const SearchList = ({
  value,
  options,
  placeholder,
  maxItems = 10,
  onSelect,
}) => {
  /* TODO:
  - Consider removing maxItems completely, and instead add vertical overflow and a maximum size.
    Searches with too many results should be minimized with the minimum search length of 3.
  */
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [fuse, setFuse] = useState(null);
  const [lastOkValue, setLastOkValue] = useState('');

  useEffect(() => {
    setFuse(new Fuse(options, searchOptions));
  }, [options]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredAndOrderedOptions = useMemo(() => {
    if (!filter || filter.trim().length < 3) {
      return options;
    }

    return fuse.search(filter).map((el) => el.item);
  }, [fuse, options, filter]);

  const changeHandler = (event) => {
    const input = event.target.value;
    setInputValue(input);
    setFilter(input);
  };

  const focusHandler = () => {
    setFocused(true);
  };

  const blurHandler = () => {
    if (inputValue !== lastOkValue) {
      setInputValue(lastOkValue);
    }
    setFocused(false);
  };

  const selectHandler = (element) => {
    onSelect(element);
    setLastOkValue(element.value);
  };

  return (
    <>
      <DebounceInput
        className="rounded border-2 border-solid border-slate-500 outline-offset-2 px-1 my-1"
        value={inputValue}
        type="search"
        placeholder={placeholder}
        debounceTimeout={300}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
      ></DebounceInput>
      {focused && (
        <ul className="flex-column items-start">
          {filteredAndOrderedOptions.slice(0, maxItems).map(
            (element) =>
              element.value && (
                <li
                  key={element.value}
                  onMouseDown={() => selectHandler(element)}
                >
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
