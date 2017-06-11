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
import {messageActions} from '../../actions/messageActions';
import * as Utils from '../../utils';
import Notification from '../Notification';

import './styles.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notofication: null
        };

        this.logout = this.logout.bind(this);
        this.incomeFromSocket = this.incomeFromSocket.bind(this);
        this.onCloseSocket = this.onCloseSocket.bind(this);
        this.createSocket = this.createSocket.bind(this);
    }

    getProfileLink(id) {
        const path = id ? `/personal_area` : '/authorization';
        const text = id ? 'Личный кабинет' : 'Вход / Регистрация';

        return (
            <Link to={path}
                  className="link link-profile"
                  activeClassName="link-active-profile">
                <span>{text}</span>
            </Link>
        );
    }

    incomeFromSocket(event) {
        const {currentUserId, messageActions} = this.props;
        const message = JSON.parse(event.data);
        if (message.fromId === currentUserId || message.toId === currentUserId) {
            messageActions.addMessage(message);
            Utils.getFromUrl(`http://localhost:3000/users/profile/${message.fromId}`).then((userInfo) => {
                const {firstName, secondName} = userInfo;
                const userName = `${secondName} ${firstName}`;
                this.setState({ notification: `Новое сообщение от пользователя ${userName}` });
                setTimeout(() => {
                    this.setState({ notification: null });
                }, 3000);
            });
        }
    }

    onCloseSocket(event) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
        console.log('Код: ' + event.code + ' причина: ' + event.reason);


        this.createSocket();
    }

    createSocket() {
        let socket = null;
        while (!socket) {
            console.log('Попытка соединения...');
            socket = new WebSocket("ws://localhost:9000");
        }
        console.log('Соединение установлено');

        this.props.messageActions.createSocket(socket);
        socket.addEventListener('message', this.incomeFromSocket);
        socket.addEventListener('close', this.onCloseSocket);
    }

    componentWillMount() {
        const {currentUserId, userActions} = this.props;
        if (!currentUserId) {
            const user = Utils.getFromLocalStorage('user');
            if (user) {
                userActions.loadUser(user);
            }
        }

        this.createSocket();
    }

    logout() {
        this.props.userActions.logoutUser();
        Utils.removeFromLocalStorage('user');
        browserHistory.push('/');
    }

    render() {
        const {notification} = this.state;
        const {location, currentUserId} = this.props;
        const profileLink = this.getProfileLink(currentUserId);
        return (
            <Row className="header">
                <Col className="header-navbar">
                    <IndexLink to="/" className="link link-main" activeClassName="link-active">Главная</IndexLink>

                    {location.path && location.path === 'personal_area' ?
                        <div className="profile-links-container">
                            <Link to={`/personal_area/profile/${currentUserId}`} className="link"
                                  activeClassName="link-active">Профиль</Link>
                            <Link to={`/personal_area/orders/${currentUserId}`} className="link"
                                  activeClassName="link-active">Заказы</Link>
                            <Link to={`/personal_area/messages`} className="link"
                                  activeClassName="link-active">Сообщения</Link>
                            <Link to={`/personal_area/settings/${currentUserId}`} className="link"
                                  activeClassName="link-active">Настройки</Link>
                            <Link to="/" className="link" onClick={this.logout}>Выйти</Link>
                        </div>
                        : null
                    }

                    {profileLink}
                </Col>
                <Notification text={notification} />
            </Row>);
    }
};

const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    errorMessage: state.users.errorMessage,
    socket: state.messages.socket
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
