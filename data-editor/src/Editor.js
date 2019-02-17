import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// import * as R from 'ramda';

import {benzodiazepines} from './mock_data';
const R = require('ramda');

function makeData() {
  return R.flatten(R.repeat(benzodiazepines.drugs, 20));
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
    console.log(data)

    return (
      <div>
        <ReactTable
          data={data}
          // id: 'dose', // only needed if accessor is not a string
          columns={[
            { Header: "DOSE", id: 'a', accessor: d => JSON.stringify(d.data["DOSE"]) },
            { Header: "ONSET/DURATION", id: 'b', accessor: d => JSON.stringify(d.data["DOSE"]) },
            { Header: "ONSET/DURATION", id: 'c', accessor: d => JSON.stringify(d.data["ONSET/DURATION"]) },
            { Header: "METABOLISM/EXCRETION", id: 'd', accessor: d => JSON.stringify(d.data["METABOLISM/EXCRETION"]) },
            { Header: "WARNINGS", id: 'e', accessor: d => JSON.stringify(d.data["WARNINGS"]) }
          ]}
          defaultPageSize={30}
          className="-striped -highlight"
        />
      </div>
    );
  }
}