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
    }
    this.loadSheetList = this.loadSheetList.bind(this); //Bind so items can be used in a callback.
    this.setSheetList = this.setSheetList.bind(this);
    this.loadDataFromSheet = this.loadDataFromSheet.bind(this);
    this.initDataFromSheet = this.initDataFromSheet.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  /////////////////////////////////////////////////////////////////////
  /**
   * I guess what we want to do here is load up all the sheets and then
   * assign each sheet to a property on state which can then be passed
   * down as props to the children components. Children components can
   * selectively choose which props to use or we can selectively passe
   * them down from this component, see the render function on how to
   * pass props down
   */
  /////////////////////////////////////////////////////////////////////


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
      const title = entries[i].title.$t;
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
    console.log("Loading data for: "+sheetName);
    if (props.sheetList == null) {
      console.log("Load sheet called before sheetlist was initialized, cancelling load request.");
      return null;
    }
    if (props.datasheets[sheetName] != null) {
      return props.sheets[sheetName];
    } else {
      loadDataFromSheet(sheetName,this.initDataFromSheet);
    }
  }
  //Function that uses an http get request to get the contents of the specified sheet, grabbing the key from the props mapping. 
  //Should only be called if setSHeetList has already completed.
  loadDataFromSheet(sheetName, callback) {
    const sheetId = this.props.sheetList[sheetName];
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
    const title = sheet.feed.title.$t;
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
    propsData[title]=sheetMap;
    this.setState({datasheets:propsData});
  }



  render() {
    // clone children components, while adding props to them
    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        /**
         * assign props you want to pass down as properties of the children
         * example commented out below.
         * then we can use object destructuring to take the prop 'loadItemList'
         * and call it in one of the children for example, maybe when you click
         * swords it will trigger to load the swords item list so that the view
         * can display them
         */ 
        loadData: this.loadData, //Function any component can use to get and/or load data. 
        sheetDdata: this.sheetData, //Container of all sheet data already loaded.
        sheetList: this.sheetList //List of spreadsheets on the source, in case that's relevant somewhere. Should also trigger an update on any children so they can re-attempt to load data I  think, not sure. 

        // loadItemList: this.loadItemList
      });
    });

    return (
      <div>
        <Navbar />
        {children}
      </div>
    )
  }
}
