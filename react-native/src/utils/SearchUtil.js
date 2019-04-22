import Fuse from 'fuse.js';

import { firebase } from '../utils/FirebaseWrapper';
let itemsRef = firebase.database.ref('/drugs');

/*
export enum SearchResultType
*/
export const SearchResultType = {
  DRUG: 'drug',
  DRUG_CLASS: 'class',
  SUBCLASS: 'subclass',
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
      const isSubclass = subclassName === '_';

      const subclassPath = [ drugClassName, subclassName ];

      // Add entry
      data.push(processSubclass(subclassName, subclassPath, isSubclass));

      // Loop through drugs
      for (let drugName in subclass) {
        const drug = subclass[drugName];
        data.push(processDrug(drugName, subclassPath, {
          'Brand Name': drug['Brand Name'],
          'Description': drug['Description'],
        }));
      }
    }
  }

  return data;
}

function processAntibiotic(antibioticName)/*: SearchResult*/ {
  // console.log('\t' + antibioticName);
  return {
    name: antibioticName,
    type: SearchResultType.ANTIBIOTIC,
    path: [ antibioticsSection, 'Antibiotics', antibioticName ],
  }
}

function processBug(bugName, bugClassName)/*: SearchResult*/ {
  // console.log('\t' + bugName)
  return {
    name: bugName,
    type: SearchResultType.BUG,
    path: [ antibioticsSection, 'Bacteria', bugName, bugClassName ],
  };
}

function processSubclass(subclassName, subclassPath, isSubclass)/*: SearchResult*/ {
  // console.log(subclassName);

  return {
    name: subclassName,
    type: isSubclass ? SearchResultType.SUBCLASS : SearchResultType.DRUG_CLASS,
    path: subclassPath
  };
}

function processDrug(drugName, subclassPath, additionalData)/*: SearchResult*/ {
  // console.log('\t' + drugName);
  return {
    name: drugName,
    type: SearchResultType.DRUG,
    path: [ ...subclassPath, drugName ],
    ...additionalData
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
    // TODO why doesn't path work?
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

// TODO separate search antibiotic and drug search?
export function search(query/*: string*/)/*: SearchResult[]*/ {
  // Return if query is too short
  if (query.length < 2) {
    return [];
  }

  let data = getData();

  // Filter data to only contain results that start with the same first letter as the query
  // TODO not sure if the clients want this
  data = data.filter((el) => {
    return el.name[0].toLowerCase() === query[0].toLowerCase();
  });

  // Perform search using Fuse.js
  const fuse = makeFuse(data);
  const fuseResult = fuse.search(query);

  // unnest into array of fuseResultEntry.item and discard fuseResultEntry.matches
  // also add key
  const result = fuseResult.map((r, i) => {
    return { ...r.item, key: '' + i };
  });

  return result;
}

export function printResults(results) {
  if (results.length == 0) {
    return;
  }
  // console.log('Found ' + (results.length) + ' results!');
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    // const item = result.item; // we're not doing this for now
    const item = result;
    console.log('Result #' + (i+1));
    console.log('\t' + item.name + ' (' + item.type + ')');
    if (item.type == 'drug') {
      console.log('\t' + 'Brand name: ' + item['Brand Name']);
      console.log('\t' + 'Found in: ' + item.path.join(' > '));
    }
    if (item.type == 'bug') {
      console.log('\t' + 'Found in: ' + item.bugClass);
    }

    console.log();
  }

  console.log(results);
}
