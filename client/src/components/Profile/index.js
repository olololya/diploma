import React, {Component} from 'react';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {userActions} from '../../actions/userActions';
import {messageActions} from '../../actions/messageActions';
import * as Utils from '../../utils';

import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            users: []
        }
    }

    componentWillMount() {
        const {id} = this.props.params;
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${id}`).then(data => {
            const userInfo = {...data.user};
            if (data.profile) {
                userInfo.areas = data.profile.areas;
                userInfo.transport = data.profile.transport;
                userInfo.price = data.profile.price;
            }
            this.setState({ userInfo });
        });

        Utils.getFromUrlGET('http://localhost:3000/users').then((users) => {
            this.setState({ users });
        });
    }

    renderListOfUsers(users) {
        if (users.length) {
            const {currentUserId} = this.props;
            return users.map((user, index) => {
                if (user._id === currentUserId) {
                    return null;
                }
                return (
                    <Row key={index} >
                        <Link to={`/personal_area/messages/${user._id}`}>
                            <Col md={8} mdOffset={2} className="user-container">
                                {`${user.secondName} ${user.firstName}`}
                            </Col>
                        </Link>
                    </Row>
                );
            });
        }

        return 'Список пуст';
    }

    render() {
        const {userInfo, users = []} = this.state;
        const {_id, firstName = '', secondName = '', lastName = '', type, dateRegistration, login, email,
            bDate = 'Не указано', place = 'Не указано', numOrders = '0', rating = 'Не определено'
        } = userInfo;
        const typeText = type === 'customer' ? 'Заказчик' : 'Курьер';
        const {currentUserId} = this.props;

        return (
            <Row style={{ height: '100%' }}>
                <Row>
                    <Col md={12} className="profile-container">
                        <Row className="profile-title">
                            <h3>{`${firstName} ${secondName} ${lastName}`}</h3>
                            <span>{typeText}</span>
                            <br />
                            {_id !== currentUserId ?
                                <Link to={`/personal_area/messages/${_id}`}>Написать сообщение</Link>
                                : null
                            }
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Row>Логин:</Row>
                                <Row>Email:</Row>
                                <Row>Дата регистрации:</Row>
                                <Row>Дата рождения:</Row>
                                <Row>Местонахождение:</Row>
                                <Row>Количество заказов:</Row>
                                <Row>Рейтинг:</Row>
                            </Col>
                            <Col md={2}>
                                <Row>{login}</Row>
                                <Row>{email}</Row>
                                <Row>{dateRegistration}</Row>
                                <Row>{bDate}</Row>
                                <Row>{place}</Row>
                                <Row>{numOrders}</Row>
                                <Row>{rating}</Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {this.renderListOfUsers(users)}
                </Row>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
