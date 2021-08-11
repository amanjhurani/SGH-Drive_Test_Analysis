import React from "react";
import ReactFileReader from "react-file-reader";
import { CsvToHtmlTable } from "react-csv-to-table";
import { Publish, Timeline } from "@material-ui/icons";
import { getFiles, getCurrentFile } from '../../api/GetFiles'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import "./Home.css";
import { uploadFile } from "../../api/uploadFile";
import { Link } from "react-router-dom";
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
      if(localStorage.getItem("current_file") != null) {
        getCurrentFile(localStorage.getItem("current_file"))
        .then((res) => {
          this.setState({csvData: res.data})
        })
        .catch((err) => {
          console.log("something went wron with file get", err);
        })
      }
  }
  render() {
    return (
      <div className="home bg-black-2">
        <div className="home-wrapper">
          <div className="file-list p-4 clearfix">
            <h3 className="mb-3 text-white">Select Datasheet</h3>
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
            className="float-left"
          >
            <button className="home-uploadbtn shadow bg-black-1">
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
              <div className="home-btndiv my-2">
                <Link to="/analyze/mapView" >
                <button className="home-analyzebtn">
                  <Timeline className="btn-icon" /> Analyze
                </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="home-blank text-white">Please upload a csv file.</div>
          )}
        </div>
      </div>
    );
  }
}
