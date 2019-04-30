import * as SearchUtil from '../src/utils/SearchUtil';
import { mockDrugData } from '../mock/mockDrugData';

function testSearch(query) {
  console.log('Searching for ' + query);

  // Perform the search
  const results = SearchUtil.search(query);

  return results;
}

test('SearchUtil test', () => {
  // Load data to be used for search
  SearchUtil.loadRawData(mockDrugData);

  let results;

  results = testSearch('benzo');
  expect(results[0].name).toBe('Benzonate');
  expect(results[0].type).toBe(SearchUtil.SearchResultType.DRUG);
  expect(results[1].name).toBe('Benzodiazepines');
  expect(results[1].type).toBe(SearchUtil.SearchResultType.DRUG_CLASS);

  results = testSearch('amoxicillin');
  expect(results[1].name).toBe('Amoxicillin');
  expect(results[1].type).toBe(SearchUtil.SearchResultType.ANTIBIOTIC);
});
