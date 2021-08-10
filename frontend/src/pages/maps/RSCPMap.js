import {
    MapContainer,
    TileLayer,
    Circle,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import './map.css'
import { getRSCP } from "../../api/getData";
export default class RSCPMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rscp: [],
            position: [],
            colors: ["#6ace61"],
            values: [],
            greenOptions: { fillColor: "blue" }
        };
    }
    componentDidMount() {
        getRSCP(localStorage.getItem("current_file"))
            .then((res) => {
                var data = res.data
                this.setState({ rscp: data })
            })
    }
    getColor(rscp) {
        if (rscp < 0 && Number(rscp) > -60) {
            return "#6ace61";
        }
        else if (rscp < -60 && rscp > -75) {
            return "#fbfb43";
        }
        else if (rscp < -75 && Number(rscp) > -85) {
            return "#f7ba30";
        }
        else if (rscp < -85 && Number(rscp) > -95) {
            return "#ec031d";
        }
        else if (rscp < -95 && Number(rscp) > -124) {
            return "#ab0312";
        }
    }
    render() {
        return (
            <div className="map">
                <MapContainer
                    className="map-IND"
                    center={[22.508548, 73.471351]}
                    zoom={15}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.rscp.map((rscpObj) => {
                        console.log("position point", rscpObj.coordinate)
                        return (<Circle
                            center={rscpObj.coordinate}
                            pathOptions={{color: this.getColor(rscpObj.active_rscp)}}
                            radius={50}
                            key={rscpObj.coordinate}
                        >  <Popup>
                                active RSCP: {rscpObj.active_rscp}
                            </Popup> </Circle>)
                    })}
                </MapContainer>
            </div>
        );
    }
}
