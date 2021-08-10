import {
    MapContainer,
    TileLayer,
    Circle,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import './map.css'
import { getRSSI } from "../../api/getData";
export default class RSSIMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rssi: [],
            position: [],
            colors: ["#6ace61"],
            values: [],
            center: {},
            greenOptions: { fillColor: "blue" }
        };
    }
    componentDidMount() {
        getRSSI(localStorage.getItem("current_file"))
            .then(async (res) => {
                var data = res.data
                await this.setState({ rssi: data, center: data[200] })
                console.log("center", this.state.center.coordinate)
            })
    }
    getColor(rssi) {
        if (rssi < 0 && Number(rssi) >= -70) {
            return "#6ace61";
        }
        else if (rssi < -70 && rssi > -85) {
            return "#fbfb43";
        }
        else if (rssi < -86 && Number(rssi) > -100) {
            return "#f7ba30";
        }
        else if (rssi < -100 && Number(rssi) > -110) {
            return "#ec031d";
        }
        else if (rssi < -110) {
            return "#ab0312";
        }
    }
    render() {
        return (
            <div className="map">
                {this.state.center.coordinate ? (<MapContainer
                    className="map-IND"
                    center={this.state.center.coordinate}
                    zoom={14}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.rssi.map((rssiObj) => {
                        return (<Circle
                            center={rssiObj.coordinate}
                            pathOptions={{color: this.getColor(rssiObj.active_rssi)}}
                            radius={50}
                            key={rssiObj.coordinate}
                        >  <Popup>
                                active rssi: {rssiObj.active_rssi}
                            </Popup> </Circle>)
                    })}
                </MapContainer>) : ""}
            </div>
        );
    }
}
