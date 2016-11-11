import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import 'whatwg-fetch'
import { withRouter } from 'react-router';

class ItemsHome extends Component {
  constructor(props) {
    super(props);
    window.sourceSheet = '1HktYmh9zKprS5YrBWMakZKIfKNIa7bV9X7fp_bpaAfM';
    this.updateData = this.updateData.bind(this);
    this.loadData = this.loadData.bind(this);
    loadSheetList(this.loadData);
  }

  render() {
    if (this.state != null && this.state.data != null) {
     console.log("Rendering data.");
    return (
        <div>
        <GenericJsonTable data={this.state.data}/>
        </div>
      );
    } else {
      console.log("Rendering loading.");
      return (<div>loading...</div>);
    }
  }

  loadData(updateData) {
    var sheetMap = initSheetList(updateData,this.loadItems)
    this.setState({sheetList:sheetMap});
    loadItemList(sheetMap.Swords, this.updateData);
  }
  updateData(data) {
    var rows = initItemList(data);
    this.setState({data:rows});
  }
}

class GenericJsonTable extends Component {
  render() {
      var rows = []
      var header = <GenericJsonTableHeaderRow data={this.props.data[0]}/>
      rows.push(header);

      this.props.data.forEach(function(item, index) {
        rows.push(<GenericJsonTableRow data = {item}/>);
        console.log(rows.length);
      });

      return ( <div> {rows} </div>);
  }

}
class GenericJsonTableHeaderRow extends Component {
  render () {
    var cells = [];
    var keys = Object.keys(this.props.data);
    keys.forEach(function(key,index,cells)  {
       cells.push(<GenericJsonTableHeaderCell value={key}/>);
    });
    return (
      <div>{cells}</div>
    )
  }
}

class GenericJsonTableRow extends Component {
  render () {
    var cells = [];
    for (var property in this.props.data) {
      if (this.props.data.hasOwnProperty(property)) {
        cells.push(<GenericJsonTableCell value={property}/>);
      }
    } 
    return (
      <div>{cells}</div>
    )
  }
}

class GenericJsonTableCell extends Component {
  render() {
    return (<div>{this.props.value}</div>);
  }
}

class GenericJsonTableHeaderCell extends Component {
  render() {
    return (<div><h1>{this.props.value}</h1></div>);
  }
}


function loadSheetList(callback) {
  fetch('https://spreadsheets.google.com/feeds/worksheets/'+window.sourceSheet+'/public/basic?alt=json')
  .then(function(response) {
      return response.text();
    }).then(callback);
}
function initSheetList(sheetsJson) {
  var sheets = JSON.parse(sheetsJson);
  var entries = sheets.feed.entry;
  var arrayLength = entries.length;
  var sheetMap = {};
  for (var i = 0; i < arrayLength; i++) {
    var title = entries[i].title.$t;
    console.log(title);
    var id = entries[i].id.$t;
      var lastSlash = id.lastIndexOf('/');
      id = id.substring(lastSlash+1,id.length);
      sheetMap[title] = id;
    }
    return sheetMap;
}

function loadItemList(sheetId, callback) {
    fetch('https://spreadsheets.google.com/feeds/list/'+window.sourceSheet+'/'+sheetId+'/public/basic?alt=json')
    .then(function(response) {
      return response.text();
    }).then(callback)

}

function initItemList(sheetsJson) {
  var sheet = JSON.parse(sheetsJson);
  var rows = sheet.feed.entry;
  var parsedRows = [];
  for (var i = 0; i < rows.length; i++) {
    var row = {}
    row.itemName = rows[i].title.$t;
    var otherCells = rows[i].content.$t;
    var cells = otherCells.split(',');
    for (var j = 0; j < cells.length; j++) {
      var pieces = cells[j].split(":");
      row[pieces[0]] = pieces[1];
    }
    parsedRows[i] = row;
  }
  console.log(parsedRows.length);
  return parsedRows;
}



export default ItemsHome;
