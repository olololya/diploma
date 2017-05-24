import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Header';
import '../stylesheet/app.scss';

const App = (props) => (
  <Grid >
    <Row>
      <Col>
        {props.children}
      </Col>
    </Row>
  </Grid>
);

export default App;
