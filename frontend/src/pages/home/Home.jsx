import React from "react";
import ReactFileReader from "react-file-reader";
import { CsvToHtmlTable } from "react-csv-to-table";
import { Publish, Timeline } from "@material-ui/icons";

import "./Home.css";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: "",
    };
  }

  handleFiles(files) {
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
        <div className="home-wrapper">
          <ReactFileReader
            handleFiles={(e) => this.handleFiles(e)}
            fileTypes={".csv"}
          >
            <button className="home-uploadbtn">
              <Publish className="btn-icon" /> Upload
            </button>
          </ReactFileReader>
          {this.state.csvData && this.state.csvData.length ? (
            <div className="home-excelwrapper">
              <div className="home-excel">
                <CsvToHtmlTable
                  data={this.state.csvData}
                  csvDelimiter=","
                  tableClassName="table table-striped table-hover"
                />
              </div>
              <div className="home-btndiv">
                <button className="home-analyzebtn">
                  <Timeline className="btn-icon" /> Analyze
                </button>
              </div>
            </div>
          ) : (
            <div className="home-blank">Please upload a csv file.</div>
          )}
        </div>
      </div>
    );
  }
}
