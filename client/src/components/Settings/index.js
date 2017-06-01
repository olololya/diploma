import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';


class Settings extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Settings</h1>
                </Col>
            </Row>
        );
    }
}

export default Settings;
