import React from 'react';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import Header from './Header/Header';

import '../stylesheet/app.scss';

const App = (props) => {
    return (
        <Grid fluid>
            <Row>
                <Header location={props.routes[1]} />
            </Row>
            <Row style={{ height: '100%' }}>
                <Col md={12} style={{ height: '100%' }}>
                    {props.children}
                </Col>
            </Row>
        </Grid>
    );
};

export default App;
