/**
 * Shop Heroes Data Hub ~ Main Container that holds state/data
 */

import React, { Component } from 'react';
import { Navbar } from 'components';
import 'whatwg-fetch';

export default class DataHub extends Component {
  constructor() {
    super();
    this.worksheets = 'https://spreadsheets.google.com/feeds/worksheets';
    this.listsheets = 'https://spreadsheets.google.com/feeds/list';
    this.sourceSheet = '1HktYmh9zKprS5YrBWMakZKIfKNIa7bV9X7fp_bpaAfM';
    this.state = {

    }

    // this.initSheetList = this.initSheetList.bind(this);
    // this.updateData = this.updateData.bind(this);
    // this.loadData = this.loadData.bind(this);
    // this.loadSheetList = this.loadSheetList.bind(this);
    // this.loadItemList = this.loadItemList.bind(this);
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
    
    // this.loadSheetList(this.loadData);
  }

  // loadData(updateData) {
  //   const sheetMap = initSheetList(updateData, this.loadItems)
  //   this.setState({ sheetList: sheetMap });
  //   loadItemList(sheetMap.Swords, this.updateData);
  // }

  // updateData(data) {
  //   const rows = initItemList(data);
  //   this.setState({ data: rows });
  // }

  // loadSheetList(callback) {
  //   fetch(this.spreadsheet + this.sourceSheet + '/public/basic?alt=json')
  //     .then(function (response) {
  //       return response.text();
  //     }).then(callback);
  // }

  // initSheetList(sheetsJson) {
  //   const sheets = JSON.parse(sheetsJson);
  //   const entries = sheets.feed.entry;
  //   const arrayLength = entries.length;
  //   const sheetMap = {};
  //   for (let i = 0; i < arrayLength; i++) {
  //     const title = entries[i].title.$t;
  //     const id = entries[i].id.$t;
  //     let lastSlash = id.lastIndexOf('/');
  //     id = id.substring(lastSlash + 1, id.length);
  //     sheetMap[title] = id;
  //   }
  //   return sheetMap;
  // }

  // loadItemList(sheetId, callback) {
  //   fetch(this.spreadsheet + this.sourceSheet + '/' + sheetId + '/public/basic?alt=json')
  //     .then(function (response) {
  //       return response.text();
  //     }).then(callback)
  // }

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
