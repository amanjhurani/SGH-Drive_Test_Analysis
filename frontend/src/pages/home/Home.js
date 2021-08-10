import React from "react";
import ReactFileReader from "react-file-reader";
import { CsvToHtmlTable } from "react-csv-to-table";
import { Publish, Timeline } from "@material-ui/icons";
import { getFiles } from '../../api/GetFiles'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import "./Home.css";
import { uploadFile } from "../../api/uploadFile";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: "",
      fileList: []
    };
  }

  handleFiles(files) {
    console.log("file list", files[0]);
    var data = new FormData()
    data.append("file", files[0])
    uploadFile(data)
    .then((res) => {
      getFiles()
      .then((res) => {
        this.setState({ fileList: res.data })
        this.setState({currFile: files[0].name})
        localStorage.setItem("current_file", files[0].name);
      })
      .catch((err) => {
        console.log("something went wrong /Home")
      })
    })
    .catch((err) => {
      console.log("file upload error", err)
    })
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        csvData: reader.result
      });
    };
    reader.readAsText(files[0]);
  }
  componentDidMount() {
    getFiles()
      .then((res) => {
        this.setState({ fileList: res.data })
      })
      .catch((err) => {
        console.log("something went wrong /Home")
      })
  }
  render() {
    return (
      <div className="home">
        <div className="home-wrapper">
          <div className="file-list p-4 clearfix">
            <h3 className="mb-3">Select Datasheet</h3>
            <DropdownButton id="dropdown-basic-button" title="Select from uploads" className="float-left">
              {
                this.state.fileList.map((file, idx) => {
                 return <Dropdown.Item key={idx}>{file}</Dropdown.Item>
                })
              }
              
            </DropdownButton>
            <ReactFileReader
            handleFiles={(e) => this.handleFiles(e)}
            fileTypes={".csv"}
            className="float-right"
          >
            <button className="home-uploadbtn">
              <Publish className="btn-icon" /> Upload
            </button>
          </ReactFileReader>
          </div>

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
