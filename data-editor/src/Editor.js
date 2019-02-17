import React from 'react';
import ReactDataGrid from 'react-data-grid';

import {benzodiazepines} from './mock_data'
let rowsCount = benzodiazepines.drugs.length;

const EmptyRowsView = () => {
  const message = "No data to show (yet!)";
  return (
    <div style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}>
      {/* <img src="./logo.png" alt={message} /> */}
      <h3>{message}</h3>
    </div>
  );
};

const SubcellFormatter = ({ subfield, subvalue }) => {
  return (
    <div>
      <b>{subfield}:</b><br/>
      {subvalue}
    </div>
  )
}

const CellFormatter = ({ value }) => {
  // value is the cell data received by the formatter
  // in this case, it is an object
  const subcells = Object.entries(value).map((entry) => {
    let [ subfield, subvalue ] = entry; // destructure entry
    return (<SubcellFormatter subfield={subfield} subvalue={subvalue} />);
  });

  // TODO align left
  return (
    <div>
      {/* {subcells} */}
      "helloooo"
    </div>
  );
}

const CustomRowRenderer = ({renderBaseRow, ...props}) => {
  const height = 300; // TODO calculate how much space it needs
  // props.row /* row data */
  return renderBaseRow({...props, height: height});
 }

// Attach CellFormatter to columns
for (let i in benzodiazepines.columns) {
  const col = benzodiazepines.columns[i];
  if (col.key !== 'name') {
    col.formatter = CellFormatter;
  }
}

export default class Editor extends React.Component {
  /*
  state = {
  };

  constructor(props) {
    super(props);
  }
  */

  /*
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    console.log({fromRow, toRow});
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  */

  getRow = (i) => {
    const drug = benzodiazepines.drugs[i];

    if (!drug) {
      return null;
    }

    const rowData = Object.assign({ name: drug.name }, drug.data);
    return rowData;
  }

  render() {
    return (
      <ReactDataGrid
        columns={benzodiazepines.columns}
        rows={benzodiazepines.drugs}
        rowsCount={rowsCount}
        emptyRowsView={EmptyRowsView}

        rowGetter={this.getRow}
        // onGridRowsUpdated={this.onGridRowsUpdated}
        headerRowHeight={35}
        rowRenderer={CustomRowRenderer}
        minHeight={window.innerHeight}
        maxHeight={window.innerHeight}

      />
    );
  }
}