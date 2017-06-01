import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

import './styles.scss';

class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row className="home-container">
                <Col md={12}>
                    <h1>MAIN</h1>
                </Col>
            </Row>
        );
    }
}

export default Home;
