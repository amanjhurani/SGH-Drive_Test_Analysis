import {
    MapContainer,
    TileLayer,
    Circle,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import './map.css'
import { getECIO } from "../../api/getData";
export default class ECIOMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ecio: [],
            position: [],
            colors: ["#6ace61"],
            values: [],
            greenOptions: { fillColor: "blue" }
        };
    }
    componentDidMount() {
        getECIO(localStorage.getItem("current_file"))
            .then((res) => {
                var data = res.data
                this.setState({ ecio: data })
            })
    }
    getColor(ecio) {
        if (ecio < 0 && Number(ecio) >= -6) {
            return "#6ace61";
        }
        else if (ecio < -6 && ecio > -10) {
            return "#fbfb43";
        }
        else if (ecio < -10 && Number(ecio) > -20) {
            return "#ec031d";
        }
        else if (ecio < -20) {
            return "#ab0312";
        }
    }
    render() {
        return (
            <div className="map">
                <MapContainer
                    className="map-IND"
                    center={[22.508548, 73.471351]}
                    zoom={14}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.ecio.map((ecioObj) => {
                        console.log("position point", ecioObj.coordinate)
                        return (<Circle
                            center={ecioObj.coordinate}
                            pathOptions={{color: this.getColor(ecioObj.active_eclo)}}
                            radius={50}
                            key={ecioObj.coordinate}
                        >  <Popup>
                                active ecio: {ecioObj.active_eclo}
                            </Popup> </Circle>)
                    })}
                </MapContainer>
            </div>
        );
    }
}
