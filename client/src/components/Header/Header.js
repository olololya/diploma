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
                    <IndexLink to="/" className="link" activeClassName="link-active">Главная</IndexLink>
                    <Link to="/customer" className="link" activeClassName="link-active">Заказчику</Link>
                    <Link to="/courier" className="link" activeClassName="link-active">Курьеру</Link>
                    <Link to="/about" className="link" activeClassName="link-active">О проекте</Link>

                    <Link to="/profile"
                          className="link link-profile"
                          activeClassName="link-active-profile">
                        <span>Личный кабинет</span>
                    </Link>
                </Col>
            </Row>);
    }
};

const mapStateToProps = state => ({
    userState: state.users
});

export default connect(mapStateToProps)(Header);
