import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

import './styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="header">
                <Col className="header-navbar">
                    <a href="#main" className="link">Главная</a>
                    <a href="#customer" className="link">Заказчику</a>
                    <a href="#courier" className="link">Курьеру</a>
                    <a href="#about" className="link">О проекте</a>
                </Col>
            </Row>);
    }
};

const mapStateToProps = state => ({
    userState: state.users
});

export default connect(mapStateToProps)(Header);
