import React from 'react';
import './Report.css';
// import logo from '../BSNL_Logo.svg';
import RSSIMap from '../maps/RSSIMap';
import RSCPMap from '../maps/RSCPMap';
import ECIOMap from '../maps/ECIOMap';
import KmeanPie from '../charts/KmeanPie';
import KmeanChart from '../charts/KmeansChatrt';
export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: '',
            fileList: [],
        };
    }

    render() {
        return (
            <div className="Report">
                <div className="Report-wrapper">
                    <div className="Report-upper">
                        <div className="Report-logo">
                            {/* <img src={logo} alt="" /> */}
                            <h1>BSNL</h1>
                        </div>
                        <div className="Report-heading">
                            <h2>DRIVE TEST ANALYSIS</h2>
                        </div>
                    </div>
                    <hr />
                    <div className="Report-discription">
                        <h4>Introduction to Drive Test Analysis</h4>
                        <p>
                            Drive tests are a method of measuring and assessing
                            the coverage, capacity, and QoS of a mobile radio
                            network by using moving vehicles. It is one of the
                            methods with which user-side measurements can be
                            collected. The real performance of the cellular
                            network is usually viewed from the perspective of
                            mobile subscribers and this is the reason why
                            operators use drive tests in assessing the coverage
                            and the quality of their networks as the tests give
                            the results from the field. It provides accurate
                            real-world capture of the RF environment under a
                            particular set of network and environmental
                            conditions. The most important reasons for drive
                            tests performed in the network is for the
                            optimization of capacity, coverage, mobility or QoS
                            verification. By measuring what a subscriber is
                            expected to experience, in a particular location,
                            MNOs can then make corrective planning for network
                            performance improvement. It is however costly due to
                            the recruiting of skilled engineers surveyors and
                            using vehicles. Moreover, it is constrained in both
                            time and space and rarely covers in-building areas
                            which greatly limits the validity of data as it
                            restricts real-life scenarios.
                        </p>
                    </div>

                    <div className="Report-graphs">
                        <h4>Analysis Output</h4>
                        <div className="Report-graph-groups">
                            <div className="Rssi-map">
                                <RSSIMap />
                                RSSI (Route Analysis Report)
                            </div>
                            <div className="Rscp-map">
                                <RSCPMap />
                                RSCP (Route Analysis Report)
                            </div>
                            <div className="Ecio-map">
                                <ECIOMap />
                                EC/IO (Route Analysis Report)
                            </div>
                        </div>
                    </div>

                    <div className="Report-discription">
                        <h4>Threshold Defination</h4>
                        <p>
                            Mobile services are considered to be available when
                            radio signal level values are above the minimum
                            thresholds that allow their use. However, the
                            thresholds may be varied as per the requirement of
                            mobile operators, vendors, service requirements or
                            technology. For example in [74, 78], WCDMA coverage
                            areas are classified considering the thresholds
                            below -95dBm and -15dB as poor for signal strength
                            and signal quality respectively. Also in [75, 77],
                            different thresholds are defined for 19 European
                            countries to qualify if there is outdoor coverage or
                            not (covered / not covered). As it is observed from
                            Table 4.2 there are five classes of coverage/quality
                            levels (Poor, Fair, Good, Very good, and Excellent.
                            In this thesis, the thresholds are considered based
                            on the current use case of ethio telecom for
                            coverage assessment which represents -95dBm for RSCP
                            and -13dB for Ec/No.
                            <strong>
                                {' '}
                                Coverage Scenario (Target Class) Definition
                                Classification of signal coverage and quality
                                based on RSCP and Ec/N o level{' '}
                            </strong>
                        </p>
                    </div>

                    <div className="Report-table">
                        <h3>RSSI Standard ranges</h3>
                        <table className="wikitable">
                            <tbody>
                                <tr>
                                    <th>RSSI</th>
                                    <th>Signal strength</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <th>&gt;= -70 dBm</th>
                                    <td>
                                        <b>Excellent</b>
                                    </td>
                                    <td>
                                        Strong signal with maximum data speeds
                                    </td>
                                </tr>
                                <tr>
                                    <th>-70 dBm to -85 dBm</th>
                                    <td>
                                        <b>Good</b>
                                    </td>
                                    <td>Strong signal with good data speeds</td>
                                </tr>
                                <tr>
                                    <th>-86 dBm to -100 dBm</th>
                                    <td>
                                        <b>Fair</b>
                                    </td>
                                    <td>
                                        Fair but useful, fast and reliable data
                                        speeds may be attained, but marginal
                                        data with drop-outs is possible
                                    </td>
                                </tr>
                                <tr>
                                    <th>&lt; -100 dBm</th>
                                    <td>
                                        <b>Poor</b>
                                    </td>
                                    <td>Performance will drop drastically</td>
                                </tr>
                                <tr>
                                    <th>-110 dBm</th>
                                    <td>
                                        <b>No signal</b>
                                    </td>
                                    <td>Disconnection</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="Report-table">
                        <h3>RSSI Standard ranges</h3>
                        <table className="wikitable">
                            <tbody>
                                <tr>
                                    <th>Weighted Target Classes (Coverage Scenarios)</th>
                                    <th>Target Classes</th>
                                    <th>State</th>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>
                                        <b>Good Coverage and Good Quality</b>
                                    </td>
                                    <td>
                                    RSCP ≥ -95 (dBm), Ec/No ≥ -13 (dB)
                                    </td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>
                                        <b>Good Coverage and Poor Quality</b>
                                    </td>
                                    <td>RSCP ≥ -95 (dBm)
                                    </td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>
                                        <b>Poor Coverage and Good Quality</b>
                                    </td>
                                    <td>
                                    Ec/No ≥ -13 (dB)
                                    </td>
                                </tr>
                                <tr>
                                    <th>1</th>
                                    <td>
                                        <b>Poor Coverage and Poor Quality</b>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="Report-graphs-two">
                    <div className = "Kmeans-Chart"></div>
                         <KmeanChart></KmeanChart>
                        <div></div>
                        <div className = "Kmeans-Pie">
                            <KmeanPie></KmeanPie>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}
