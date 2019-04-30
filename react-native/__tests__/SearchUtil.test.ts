import * as SearchUtil from '../src/utils/SearchUtil';

test('SearchUtil test', () => {
  const searchResults = SearchUtil.search(searchText);
  console.log(searchResults);
  expect(true).toBe(false);
});
