 /* eslint-disable */
import React from 'react'
import { Row, Col, Nav, Tab} from 'react-bootstrap'
import RSSIMap from '../maps/RSSIMap'
import './Analize.css'
class Analize extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="analize-wrapper">
                <Tab.Container className='tab-container' id="left-tabs-example" defaultActiveKey="first" className="main-content">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Map View</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Graph View</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="grid-4">
                                        <div className="grid-item"><p className="text-center" onClick={this.RenderView}>RSSI Map</p></div>
                                        <div className="grid-item"><p className="text-center">RSCP Map</p></div>
                                        <div className="grid-item"><p className="text-center">EC/Io Map</p></div>
                                        <div className="grid-item"><p className="text-center">RX/TX Map</p></div>
                                    </div>
                                    <div className="mt-3">
                                       <RSSIMap/>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    Tab 2
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default Analize