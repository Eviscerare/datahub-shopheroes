/**
 * Shop Heroes Data Hub ~ Main Container that holds state/data
 */

import React, { Component } from 'react';
import { Navbar } from 'components';
import 'whatwg-fetch';

export default class DataHub extends Component {
  constructor() {
    super();
    this.sourceSheet = '1HktYmh9zKprS5YrBWMakZKIfKNIa7bV9X7fp_bpaAfM'; // Id of the backend spreadsheet.
    this.worksheets = 'https://spreadsheets.google.com/feeds/worksheets/'; // Gets list of sheet urls.
    this.listsheets = 'https://spreadsheets.google.com/feeds/list/'; // Gets individual sheets.
    this.jsonsheet = '/public/basic?alt=json'; // Suffix for returning a sheet in JSON.
    this.state = {
      sheetList: null,
      dataSheets: null,
    }
    this.loadSheetList = this.loadSheetList.bind(this);
    this.setSheetList = this.setSheetList.bind(this);
    this.loadDataFromSheet = this.loadDataFromSheet.bind(this);
    this.initDataFromSheet = this.initDataFromSheet.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  // Call initialization functions here.
  componentDidMount() {
    console.log('Initializing Data Hub');
    this.loadSheetList(this.setSheetList);
  }

  // Uses an http-get to retrieve a list of sheets on the source spreadsheet, specifies the setSheetList as the callback to deal with the data.
  loadSheetList(callback) {
    fetch(this.worksheets + this.sourceSheet + this.jsonsheet)
      .then(response => response.text())
      .then(callback);
  }

  // Parses the raw sheet list json data and adds it to state as sheetName:sheetKey.
  setSheetList(sheetsJson) {
    console.log('Adding spreadsheets to state');
    const sheets = JSON.parse(sheetsJson);
    const entries = sheets.feed.entry;
    const arrayLength = entries.length;
    const sheetMap = {};
    entries.forEach(entry => {
      const title = entry.title.$t.toLowerCase().replace(/ /, '');
      const id = entry.id.$t;
      const lastSlash = id.lastIndexOf('/');
      sheetMap[title] = id.substring(lastSlash + 1, id.length);
    });
    this.setState({ sheetList: sheetMap });
  }

  // Function that reads the data of a specific sheet from the source, by name.
  // To be called by any component looking to load data, returns the data if it's loaded, loads it if not.
  loadData(sheetName) {
    if (!this.state.sheetList) {
      console.log('Load sheet called before sheetlist was initialized, cancelling load request.');
      return null;
    }
    if (!this.state.sheetList[sheetName]) {
      console.log('No sheet for name: ' + sheetName);
      return null;
    }
    if (this.state.dataSheets && this.state.dataSheets[sheetName]) {
      console.log('Returning loaded data for: ' + sheetName);
      return this.state.dataSheets[sheetName];
    } else {
      console.log("Loading data for: " + sheetName);
      this.loadDataFromSheet(sheetName, this.initDataFromSheet);
    }
  }
  // loadData(sheetName) {
  //   return new Promise((resolve, reject) => {
  //     if (!this.state.sheetList) {
  //       console.log('Load sheet called before sheetlist was initialized, cancelling load request.');
  //       reject();
  //     }
  //     if (!this.state.sheetList[sheetName]) {
  //       console.log('No sheet for name: ' + sheetName);
  //       reject();
  //     }
  //     if (this.state.dataSheets && this.state.dataSheets[sheetName]) {
  //       console.log('Returning loaded data for: ' + sheetName);
  //       resolve(this.state.dataSheets[sheetName]);
  //     } else {
  //       console.log("Loading data for: " + sheetName);
  //       this.loadDataFromSheet(sheetName, this.initDataFromSheet);
  //     }
  //   });
  // }

  // Function that uses an http get request to get the contents of the specified sheet, grabbing the key from state.
  // Should only be called if setSheetList has already completed.
  loadDataFromSheet(sheetName, callback) {
    const sheetId = this.state.sheetList[sheetName];
    fetch(this.listsheets + this.sourceSheet + '/' + sheetId + this.jsonsheet)
      .then(response => response.text())
      .then(callback);
  }

  // Adds received data from a spreadsheet to the props.
  initDataFromSheet(sheetsJson) {
    const sheet = JSON.parse(sheetsJson);
    const rows = sheet.feed.entry;
    const parsedRows = [];
    const title = sheet.feed.title.$t.toLowerCase().replace(/ /, '');
    rows.forEach((row, i) => {
      const parsedRow = {};
      parsedRow.itemName = row.title.$t;
      const cells = row.content.$t.split(',');
      cells.forEach(cell => {
        const pieces = cell.split(':');
        parsedRow[pieces[0]] = pieces[1];
      });
      parsedRows[i] = parsedRow;
    });
    console.log('Placing loaded data on state: ' + title);
    const dataSheets = {};
    dataSheets[title] = parsedRows;
    this.setState({ dataSheets: dataSheets });
  }

  render() {
    return (
      <div className="data-hub">
        <Navbar />
        {React.Children.map(this.props.children, child => React.cloneElement(child, { loadData: this.loadData }))}
      </div>
    )
  }
}
