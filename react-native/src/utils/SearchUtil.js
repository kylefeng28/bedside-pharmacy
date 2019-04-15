import Fuse from 'fuse.js';

import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

/*
enum SearchResultType {
  DRUG_CLASS = 'drug',
  ANTIBIOTIC = 'antibiotic',
  BUG = 'bug'
}
*/
const SearchResultType = {
  DRUG_CLASS: 'drug',
  ANTIBIOTIC: 'antibiotic',
  BUG: 'bug'
};

/*
export interface SearchResult {
  name: string;
  type: SearchResultType;
  path: string[];
}
*/

const antibioticsSection =  'Antibiotics And Organisms';
const ignored = [antibioticsSection,  'Bacteria', 'labels' ];

// Process data for search
// Returns SearchResult[]
/*export*/ function processData(rawData)/*: SearchResult[]*/ {
  const data/*: SearchResult[]*/ = [];

  // Loop through antibiotics
  const antibioticsData = rawData[antibioticsSection];
  for (let antibioticName in antibioticsData['Antibiotics']) {
    data.push(processAntibiotic(antibioticName));
  }

  // Loop through bugs
  for (let bugClassName in antibioticsData['Bacteria']) {
    const bugClass = antibioticsData['Bacteria'][bugClassName];
    for (let bugName in bugClass) {
      data.push(processBug(bugName, bugClassName));
    }
  }

  // Loop through classes
  for (let drugClassName in rawData) {
    if (ignored.includes(drugClassName)) { continue; }

    let drugClass = rawData[drugClassName];

    // Loop through subclasses
    for (let subclassName in drugClass) {
      if (ignored.includes(subclassName)) { continue; }

      const subclass = drugClass[subclassName];
      const isSubclass = subclassName !== '_';

      const path = isSubclass ? [ drugClassName, subclassName ] : [ drugClassName ];

      // Add entry
      if (isSubclass) {
        data.push(processDrugClass(subclassName, drugClassName));
      } else {
        data.push(processDrugClass(drugClassName, null));
      }

      // Loop through drugs
      for (let drugName in subclass) {
        const drug = subclass[drugName];
        data.push(processDrug(path, drugName, drug));
      }
    }
  }

  return data;
}

function processAntibiotic(antibioticName)/*: SearchResult*/ {
  console.log('\t' + antibioticName);
  return {
    name: antibioticName,
    type: SearchResultType.ANTIBIOTIC,
    path: [ antibioticsSection, 'Antibiotics', antibioticName ],
  }
}

function processBug(bugName, bugClassName)/*: SearchResult*/ {
  console.log('\t' + bugName)
  return {
    name: bugName,
    type: SearchResultType.BUG,
    path: [ antibioticsSection, 'Bacteria', bugName, bugClassName ],
  };
}

function processDrugClass(className, parentClass)/*: SearchResult*/ {
  console.log(className);

  return {
    name: className,
    type: SearchResultType.DRUG_CLASS,
    path: parentClass ? [ parentClass ] : []
  };
}

function processDrug(path, drugName, drug)/*: SearchResult*/ {
  console.log('\t' + drugName);
  return {
    name: drugName,
    type: 'drug',
    path: path,
    data_: JSON.stringify(drug.data),
    ...drug
  };
}

function makeFuse(data/*: SearchResult[]*/) {
  const options = {
    shouldSort: true,
    includeMatches: true, // includes information about matched characters (for highlighting purposes)
    threshold: 0.3,
    location: 0,
    distance: 50,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'name', 'path', 'Brand Name', 'Description'
    ]
  };
  const fuse = new Fuse(data, options);
  return fuse;
}

// Fetch data from Firebase
let rawData = null;
let data = null;
// TODO refactor into a separate class to be used by anything that gets data
itemsRef.on('value', snapshot => {
  rawData = snapshot.val();
  data = processData(rawData);
});

function getData()/*: SearchResult[]*/ {
  return data;
}

// TODO use FuseResult?? we use .item
export function search(query/*: string*/)/*: SearchResult[]*/ {
  const data = getData();
  const fuse = makeFuse(data);
  const fuseResult = fuse.search(query);
  return fuseResult;
}

export function printResults(results) {
  if (results.length == 0) {
    console.log("Sorry, couldn't find any results");
    return;
  }
  console.log('Found ' + (results.length) + ' results!');
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log('Result #' + (i+1));
    console.log('\t' + result.item.name + ' (' + result.item.type + ')');
    if (result.item.type == 'drug') {
      console.log('\t' + 'Brand name: ' + result.item['Brand Name']);
      console.log('\t' + 'Found in: ' + result.item.path.join(' > '));
    }
    if (result.item.type == 'bug') {
      console.log('\t' + 'Found in: ' + result.item.bugClass);
    }

    console.log();
  }
}
