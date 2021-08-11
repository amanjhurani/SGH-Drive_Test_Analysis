import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { LineStyle, TrendingUp, Notes, Report } from '@material-ui/icons';
import {Dropdown} from 'react-bootstrap'
export default function TopBar() {
    return (
        <div className="sidebar bg-black-1">
            <div className="sidebar-wrapper">
                <div className="sidebar-listing">
                    <ul className="sidebar-list">
                        <li className="sidebar-list-item active">
                            <Link to="/">
                                <LineStyle className="sidebar-icon" />
                                Overview
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id="dropdown-button-dark-example1"
                                        variant="secondary"
                                    >
                                      <TrendingUp className="sidebar-icon" />
                                        Analyze
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu variant="light" className="bg-black-1">
                                    <Dropdown.Item as={Link} to="/analyze/mapView">
                                            Chart View
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/analyze/chartView">
                                            Chart View
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </li>
                        <li className="sidebar-list-item">
                            <Link to="/report">
                            <Report className="sidebar-icon" />
                            Report
                            </Link>
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
