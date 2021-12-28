/* TODO:
  - Add multi-word search (i.e. when some of the words match, or are in different order)
  - Add partial multi-word search (i.e. not the whole word needs to match)
*/
export const filterAndOrderByAccuracy = (options, filter) => {
  const mergedWithoutDuplicates = [];

  const exactMatch = options.find(
    (element) => element.value.toLowerCase() === filter.toLowerCase()
  );

  if (exactMatch) {
    mergedWithoutDuplicates.push(exactMatch);
  }

  options.forEach((element) => {
    if (
      !mergedWithoutDuplicates.find((el) => el.value === element.value) &&
      element.value.toLowerCase().startsWith(filter.toLowerCase())
    ) {
      mergedWithoutDuplicates.push(element);
    }
  });

  options.forEach((element) => {
    if (
      !mergedWithoutDuplicates.find((el) => el.value === element.value) &&
      element.value.toLowerCase().includes(filter.toLowerCase())
    ) {
      mergedWithoutDuplicates.push(element);
    }
  });

  return mergedWithoutDuplicates;
};
