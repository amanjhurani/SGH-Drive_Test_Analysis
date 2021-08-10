import React from "react";
import "./SideBar.css";
import {Link} from 'react-router-dom'
import { LineStyle, TrendingUp, Notes, Report } from "@material-ui/icons";

export default function TopBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-listing">
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
            <Link to='/'>
              <LineStyle className="sidebar-icon" />
              Overview
              </Link>
            </li>
            <li className="sidebar-list-item">
            <Link to='analize'>
              <TrendingUp className="sidebar-icon" />
              Analize  
              </Link>        
              </li>
            <li className="sidebar-list-item">
              <Report className="sidebar-icon" />
              Report
            </li>
            <li className="sidebar-list-item">
              <Notes className="sidebar-icon" />
              Support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
