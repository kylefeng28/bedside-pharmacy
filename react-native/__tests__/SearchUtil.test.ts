import * as SearchUtil from '../src/utils/SearchUtil';
import { mockDrugData } from '../mock/mockDrugData';

function testSearch(query) {
  console.log('Searching for ' + query);

  // Perform the search
  const results = SearchUtil.search(query);

  // Print results
  // SearchUtil.printResutlts(results);
  console.log(results);

  return results;
}

// https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
function expectMatchResult(results, expected) {
  expect(results).toEqual(
    expect.arrayContaining([
      expect.objectContaining(expected)
    ])
  );
}

test('SearchUtil search drugs and classes', () => {
  // Load data to be used for search
  SearchUtil.loadRawData(mockDrugData);

  let results;
  let expected;

  results = testSearch('benzo');
  expected = { name: 'Benzodiazepines', type: 'subclass', path: [ 'Sedation', 'Benzodiazepines' ] };
  expectMatchResult(results, expected);
  expected = { name: 'Benzonate', type: 'drug', path: [ 'Antitussive', '_', 'Benzonate' ] };
  expectMatchResult(results, expected);

  results = testSearch('amoxicillin');
  expected = { name: 'Amoxicillin', type: 'antibiotic', path: [ 'Antibiotics And Organisms', 'Antibiotics', 'Amoxicillin' ] };
  expectMatchResult(results, expected);
});

test('SearchUtil search antibiotics', () => {
  // Load data to be used for search
  SearchUtil.loadRawData(mockDrugData);

  let results;
  let expected;

  results = testSearch('amoxicillin');
  expected = { name: 'Amoxicillin', type: 'antibiotic', path: [ 'Antibiotics And Organisms', 'Antibiotics', 'Amoxicillin' ] };
  expectMatchResult(results, expected);
});
