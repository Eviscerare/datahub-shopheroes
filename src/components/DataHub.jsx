/**
 * Shop Heroes Data Hub ~ Main Container that holds state/data
 */

import React, { Component } from 'react';
import { Navbar } from 'components';
import 'whatwg-fetch';

export default class DataHub extends Component {
  constructor() {
    super();
    this.worksheets = 'https://spreadsheets.google.com/feeds/worksheets/'; //get list of sheets url
    this.listsheets = 'https://spreadsheets.google.com/feeds/list/'; //get sheet data url
    this.sourceSheet = '1HktYmh9zKprS5YrBWMakZKIfKNIa7bV9X7fp_bpaAfM'; //Id of the backend spreadsheet
    this.state = {
      sheetList: null,
      dataSheets: null,
    }
    this.loadSheetList = this.loadSheetList.bind(this); //Bind so items can be used in a callback.
    this.setSheetList = this.setSheetList.bind(this);
    this.loadDataFromSheet = this.loadDataFromSheet.bind(this);
    this.initDataFromSheet = this.initDataFromSheet.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  // call initialization functions here
  componentDidMount() {
    console.log('Initializing, should only be called once to fetch data for the whole SPA');
    
     this.loadSheetList(this.setSheetList);
  }
  //Uses an http-get to retrieve a list of sheets on the source spreadsheet, specifies the setSheetList as the callback to deal with the data.
  loadSheetList(callback) {
    fetch(this.worksheets + this.sourceSheet + '/public/basic?alt=json')
      .then(function (response) {
        return response.text();
      }).then(callback);
  }

  //Parses the raw sheet list json data and places it in the props as an object of sheetName:sheetKey parameters.
  setSheetList(sheetsJson) {
    console.log("Placing the list of spreadsheets on the props.");
    const sheets = JSON.parse(sheetsJson);
    const entries = sheets.feed.entry;
    const arrayLength = entries.length;
    const sheetMap = {};
    for (var i = 0; i < arrayLength; i++) {
      var title = entries[i].title.$t;
      title = title.toLowerCase().replace(/ /, ''); //avoid issues with case or  whitespace.
      var id = entries[i].id.$t;
      const lastSlash = id.lastIndexOf('/');
      id = id.substring(lastSlash + 1, id.length);
      sheetMap[title] = id;
    }
    this.setState({ sheetList: sheetMap });
  }

  //Function that reads the data of a specific sheet from the source, by name. 
  //To be called by any component looking to load data, returns the data if it's loaded, loads it if not.
  loadData(sheetName) {
    if (this.state.sheetList == null) {
      console.log("Load sheet called before sheetlist was initialized, cancelling load request.");
      return null;
    } else {
      if (this.state.sheetList[sheetName] == null) {
        console.log("No sheet known for name: "+sheetName);
        return null;
      }
    }
    if (this.state.dataSheets !== null && this.state.dataSheets[sheetName] != null) {
      console.log("Returning already loaded data for: "+ sheetName);
      return this.state.dataSheets[sheetName];
    } else {
      console.log("Loading data for: " + sheetName);
      this.loadDataFromSheet(sheetName, this.initDataFromSheet);
    }
  }
  //Function that uses an http get request to get the contents of the specified sheet, grabbing the key from the props mapping. 
  //Should only be called if setSHeetList has already completed.
  loadDataFromSheet(sheetName, callback) {
    const sheetId = this.state.sheetList[sheetName.toLowerCase().replace(/ /, '')];
    fetch(this.listsheets + this.sourceSheet + '/' + sheetId + '/public/basic?alt=json')
      .then(function (response) {
        return response.text();
      }).then(callback)
  }

  //Adds received data from a spreadsheet to the props.
  initDataFromSheet(sheetsJson) {
    const sheet = JSON.parse(sheetsJson);
    const rows = sheet.feed.entry;
    var parsedRows = [];
    const title = sheet.feed.title.$t.toLowerCase().replace(/ /, '');
    for (var i = 0; i < rows.length; i++) {
      var row = {}
      row.itemName = rows[i].title.$t;
      const otherCells = rows[i].content.$t;
      const cells = otherCells.split(',');
      for (var j = 0; j < cells.length; j++) {
        const pieces = cells[j].split(":");
        row[pieces[0]] = pieces[1];
      }
      parsedRows[i] = row;
    }
    console.log("Placing loaded data on props.datasheets."+title);
    const propsData = {}; //add it to the props under datasheets/<sheetname>
    propsData[title]=parsedRows;
    this.setState({dataSheets:propsData});
  }



  render() {
    // clone children components, while adding props to them
    let _children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        loadData: this.loadData
      });
    });

    return (
      <div>
        <Navbar />
        {_children}
      </div>
    )
  }
}
