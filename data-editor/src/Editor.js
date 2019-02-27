import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// import * as R from 'ramda';

import {benzodiazepines} from './mock_data';
import { access } from "fs";
const R = require('ramda');

function makeData() {
  return R.flatten(R.repeat(benzodiazepines.drugs, 20));
}

const EmptyRowsView = () => {
  const message = "No data to show (yet!)";
  return (
    <div style={{ textAlign: "center", backgroundColor: "#ddd", padding: "100px" }}>
      {/* <img src="./logo.png" alt={message} /> */}
      <h3>{message}</h3>
    </div>
  );
};

const SubcellFormatter = ({ subfield, subvalue, handleChange }) => {
  return (
    <div>
      <b>{subfield}:</b><br/>
      {/* <input type="text" name={subfield} value={subvalue} onChange={handleChange} /> */}
      <span contentEditable onBlur={handleChange}>
        {subvalue ? subvalue : "<empty>"}
      </span>
    </div>
  )
}

const CellFormatter = (props) => {
  // value contains the original (JSON) data of the cell
  const { value } = props;
  const subcells = Object.entries(value).map((entry, i) => {
    let [ subfield, subvalue ] = entry; // destructure entry
    const handleChange = (event) => {
      // TODO
      // for some reason, cell contents are not editable until the column is resized
      console.log(event)
      value[subfield] = event.value;
    };
    return (
      <SubcellFormatter key={i}
        subfield={subfield} subvalue={subvalue}
        handleChange={handleChange} />
    );
  });

  // TODO align left
  return (
    <div style={{textAlign: 'left', verticalAlign: 'top'}}>
      {subcells}
    </div>
  );
}

export default class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  render() {
    const { data } = this.state;

    const accessData = (key) => (d) => d.data[key]

    return (
      <div>
        <ReactTable
          data={data}
          // id: 'dose', // only needed if accessor is not a string
          columns={[
            { Header: "Name", id: 'name', accessor: "name" },
            { Header: "DOSE", id: 'dose',
              accessor: accessData("DOSE"), Cell: CellFormatter
            },
            {
              Header: "ONSET/DURATION", id: 'onset_duration',
              accessor: accessData("ONSET/DURATION"), Cell: CellFormatter
            },
            {
              Header: "METABOLISM/EXCRETION", id: 'metabolism_excretion',
              accessor: accessData("METABOLISM/EXCRETION"), Cell: CellFormatter
            },
            {
              Header: "WARNINGS", id: 'warnings',
              accessor: accessData("WARNINGS"), Cell: CellFormatter
            }
          ]}
          defaultPageSize={30}
          className="-striped -highlight"
        />
      </div>
    );
  }
}