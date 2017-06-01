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
        const {path} = this.props.location;

        return (
            <Row className="header">
                <Col className="header-navbar">
                    <IndexLink to="/" className="link link-main" activeClassName="link-active">Главная</IndexLink>

                    {path && path === 'profile' ?
                        <div className="profile-links-container">
                            <IndexLink to="/profile" className="link" activeClassName="link-active">Профиль</IndexLink>
                            <Link to="/orders" className="link" activeClassName="link-active">Заказы</Link>
                            <Link to="/messages" className="link" activeClassName="link-active">Сообщения</Link>
                            <Link to="/settings" className="link" activeClassName="link-active">Настройки</Link>
                        </div>
                        : null
                    }

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
