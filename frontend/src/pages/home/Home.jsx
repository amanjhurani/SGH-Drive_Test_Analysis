import React from "react";
import ReactFileReader from "react-file-reader";
import { CsvToHtmlTable } from "react-csv-to-table";
import "./Home.css";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: "",
    };
  }

  handleFiles(files){
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        csvData: reader.result,
      });
    };
    reader.readAsText(files[0]);
  }

  render() {
    return (
      <div className="home">
        <div>
          <ReactFileReader handleFiles={(e) => this.handleFiles(e)} fileTypes={".csv"}>
            <button className="btn">Upload</button>
          </ReactFileReader>
          <CsvToHtmlTable
            data={this.state.csvData}
            csvDelimiter=","
            tableClassName="table table-striped table-hover"
          />
        </div>
      </div>
    );
  }
}
