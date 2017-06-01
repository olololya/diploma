import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';


class Orders extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>ORDERS</h1>
                </Col>
            </Row>
        );
    }
}

export default Orders;
