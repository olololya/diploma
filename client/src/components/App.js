import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './Header/Header';

import '../stylesheet/app.scss';

const App = (props) => {
    return (
        <Grid fluid>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col md={12}>
                    {props.children}
                </Col>
            </Row>
        </Grid>
    );
}

export default App;
