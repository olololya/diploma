import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

//import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h1>Profile</h1>
                </Col>
            </Row>
        );
    }
}

export default Profile;
