const Fuse = require('fuse.js');
const fs = require('fs');
const rl = require('readline-sync');

if (process.argv.length < 3) {
  console.log('incorrect usage');
  process.exit(1);
}

let rawData = fs.readFileSync(process.argv[2]);
rawData = JSON.parse(rawData);

/*
class SearchResult {
  name: string;
  type: SearchResultType;
}
 */

const antibioticsSection =  'Antibiotics And Organisms';
const ignored = [antibioticsSection,  'Bacteria', 'labels' ]

// Process data for search
// Returns SearchResult[]
function processData(rawData) {
  let data = [];

  // Loop through antibiotics
  const antibioticsData = rawData['drugs'][antibioticsSection];
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
  for (let drugClassName in rawData['drugs']) {
    if (ignored.includes(drugClassName)) { continue; }

    let drugClass = rawData['drugs'][drugClassName];

    // Loop through subclasses
    for (let subclassName in drugClass) {
      if (ignored.includes(subclassName)) { continue; }

      const subclass = drugClass[subclassName];
      const isSubclass = subclassName != '_';

      const path = isSubclass ? [ drugClassName, subclassName ] : [ drugClassName ];

      // Add entry
      if (isSubclass) {
        data.push(processDrugClass(subclassName, true));
      } else {
        data.push(processDrugClass(drugClassName, false));
      }

      // Loop through drugs
      for (let drugName in subclass) {
        const drug = subclass[drugName];
        data.push(processDrug(path, drugName, drug));
      }
    }
  }

  fs.writeFileSync('processed_data.json', JSON.stringify(data));
  return data;
}

function processAntibiotic(antibioticName) {
  console.log('\t' + antibioticName)
  return {
    name: antibioticName,
    type: 'antibiotic',
    path: [ antibioticsSection, 'Antibiotics', antibioticName ],
  }
}

function processBug(bugName, bugClassName) {
  console.log('\t' + bugName)
  return {
    name: bugName,
    bugClass: bugClassName,
    type: 'bug',
    path: [ antibioticsSection, 'Bacteria', bugName ],
  }
}

function processDrugClass(className, isSubclass) {
  console.log(className);

  return {
    name: className,
    type: 'drugClass',
    isSubclass: isSubclass
    // TODO should this show parent class?
  }
}

function processDrug(path, drugName, drug) {
  console.log('\t' + drugName)
  return {
    name: drugName,
    type: 'drug',
    path: path,
    data_: JSON.stringify(drug.data),
    ...drug
  }
}

let data = processData(rawData);

const fuse = (function() {
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
})();
function search(data, query) {

  const fuseResult = fuse.search(query);
  return fuseResult;
}

function printResults(results) {
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

// Loop
while(true) {
  const query = rl.question('search> ');
	const results = search(data, query);

  printResults(results);
}
