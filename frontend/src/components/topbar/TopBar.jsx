import React from "react";
import "./TopBar.css";
import { NotificationsNone, Language, Add } from "@material-ui/icons";

export default function TopBar() {
  return (
    <div class="topbar">
      <div className="topbar-wrapper">
        <div className="topbar-left">Drive Test Analysis</div>
        <div className="topbar-right">
            <div className="topbar-iconcontainer">
              <NotificationsNone />
            </div>
            <div className="topbar-iconcontainer">
              <Language />
            </div>
            <div className="topbar-iconcontainer">
              <Add />
            </div>
        </div>
      </div>
    </div>
  );
}
