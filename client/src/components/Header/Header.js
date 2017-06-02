import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import {
    IndexLink,
    Link
} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';

import './styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    getProfileLink(id) {
        const path = id ? '/profile' : '/authorization';
        const text = id ? 'Личный кабинет' : 'Вход / Регистрация';

        return (
            <Link to={path}
                  className="link link-profile"
                  activeClassName="link-active-profile">
                <span>{text}</span>
            </Link>
        );
    }

    componentWillMount() {
        const {currentUserId, userActions} = this.props;
        if (!currentUserId) {
            const user = Utils.getFromLocalStorage('user');
            if (user) {
                userActions.loadUser(user);
            }
        }
    }

    logout() {
        this.props.userActions.logoutUser();
        Utils.removeFromLocalStorage('user');
        browserHistory.push('/');
    }

    render() {
        const {location, currentUserId} = this.props;
        const profileLink = this.getProfileLink(currentUserId);

        return (
            <Row className="header">
                <Col className="header-navbar">
                    <IndexLink to="/" className="link link-main" activeClassName="link-active">Главная</IndexLink>

                    {location.path && location.path === 'profile' ?
                        <div className="profile-links-container">
                            <IndexLink to="/profile" className="link" activeClassName="link-active">Профиль</IndexLink>
                            <Link to="/orders" className="link" activeClassName="link-active">Заказы</Link>
                            <Link to="/messages" className="link" activeClassName="link-active">Сообщения</Link>
                            <Link to="/settings" className="link" activeClassName="link-active">Настройки</Link>
                            <Link to="#" className="link" onClick={this.logout}>Выйти</Link>
                        </div>
                        : null
                    }

                    {profileLink}
                </Col>
            </Row>);
    }
};

const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
