/* eslint-disable */
import React from 'react';
import { Row, Col, Nav, Tab } from 'react-bootstrap';
import './Analize.css';
import KmeanPie from '../charts/KmeanPie';
import KmeansChart from '../charts/KmeansChatrt';
class ChartView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: KmeansChart,
            myComps: {
                KmeansChart: KmeansChart,
                KmeanPie: KmeanPie,
            },
        };
    }
    function(props) {
        const SpecificStory = components[props.storyType];
        return <SpecificStory story={props.story} />;
    }
    RenderView(comp) {
        var comps = this.state.myComps;
        this.setState({ currentComponent: comps[comp] });
    }
    render() {
        return (
            <div className="analize-wrapper chart-view">
                <div className="grid-4">
                    <div className="grid-item btn btn-primary shadow">
                        <p
                            className="text-center"
                            onClick={() => this.RenderView('KmeansChart')}
                        >
                            Ctegorized Data
                        </p>
                    </div>
                    <div
                        className="grid-item btn-primary shadow"
                        onClick={() => this.RenderView('KmeanPie')}
                    >
                        <p
                            className="text-center"
                            onClick={() => this.RenderView('KmeansChart')}
                        >
                            Percentage of signal distribution
                        </p>
                    </div>
                </div>
                <div className="px-4 py-3">
                    {<this.state.currentComponent />}
                </div>
            </div>
        );
    }
}

export default ChartView;
