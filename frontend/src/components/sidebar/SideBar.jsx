import React from "react";
import "./SideBar.css";

import { LineStyle, TrendingUp, Notes, Report } from "@material-ui/icons";

export default function TopBar() {
  return (
    <div class="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-listing">
          <ul className="sidebar-list">
            <li className="sidebar-list-item active">
              <LineStyle className="sidebar-icon" />
              Overview
            </li>
            <li className="sidebar-list-item">
              <TrendingUp className="sidebar-icon" />
              Analyze
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
