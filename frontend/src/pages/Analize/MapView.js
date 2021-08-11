/* eslint-disable */
import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import RSSIMap from '../maps/RSSIMap';
import RSCPMap from '../maps/RSCPMap';
import  ECIOMap from '../maps/ECIOMap';
import './Analize.css';
class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: RSSIMap,
            active: "RSSIMap",
            myComps: {
                RSSIMap: RSSIMap,
                RSCPMap: RSCPMap,
                ECIOMap: ECIOMap
            },
            
        };
    }
    function (props) {
        const SpecificStory = components[props.storyType];
        return <SpecificStory story={props.story} />;
    }
    RenderView(comp) {
        var comps = this.state.myComps
        this.setState({currentComponent: comps[comp], active: comp});
    }
    render() {
        const components = {
            RSSIMap: RSSIMap
        };
        return (
            <div className="analize-wrapper bg-black-2">
                <div className="grid-4">
                    <div className={"grid-item btn btn-primary shadow " + ((this.state.active =="RSSIMap") ? "active": "") } onClick={() => this.RenderView("RSSIMap")}>
                        <p className="text-center">
                            RSSI Map
                        </p>
                    </div>
                    <div className = {"grid-item btn btn-primary shadow " + ((this.state.active =="RSCPMap") ? "active": "") } onClick={() => this.RenderView("RSCPMap")}>
                        <p className="text-center">RSCP Map</p>
                    </div>
                    <div className={"grid-item btn btn-primary shadow " + ((this.state.active =="ECIOMap") ? "active": "") } onClick={() => this.RenderView("ECIOMap")}>
                        <p className="text-center">EC/Io Map</p>
                    </div>
                </div>
                <div className="px-4 py-3">
                    {
                        <this.state.currentComponent/>
                    }
                </div>
            </div>
        );
    }
}

export default MapView;
