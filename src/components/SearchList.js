import { useEffect, useState } from 'react';

const SearchList = ({ options }) => {
  const [filter, setFilter] = useState('');
  const [focused, setFocused] = useState(false);

  const inputHandler = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const selectCountry = (a) => {
    console.log(a);
  };

  return (
    <>
      <input
        type="search"
        placeholder="Select your country"
        onChange={inputHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
      {focused && (
        <ul>
          {options
            .filter(
              (e) =>
                !filter ||
                e.value.toLowerCase().includes(filter) ||
                e.label.toLowerCase().includes(filter)
            )
            .map(
              (element) =>
                element.value && (
                  <li
                    key={element.value}
                    onMouseDown={() => selectCountry(element)}
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
