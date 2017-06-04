import React, {Component} from 'react';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {userActions} from '../../actions/userActions';
import {messageActions} from '../../actions/messageActions';
import * as Utils from '../../utils';

import './styles.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.userActions.getInfo(this.props.params.id);
    }

    onClickButton() {
        this.props.messageActions.send({
            fromId: this.props.currentUserId,
            toId: this.props.userInfo.userInfoId,
            message: 'message',
            date: new Date()
        });
    }

    render() {
        const {firstName = '', secondName = '', lastName = '', type, dateRegistration, login, email,
            bDate = 'Не указано', place = 'Не указано', numOrders = '0', rating = 'Не определено'
        } = this.props.userInfo;
        const typeText = type === 'customer' ? 'Заказчик' : 'Курьер';

        return (
            <Row style={{ height: '100%' }}>
                <Col md={12} className="profile-container">
                    <Row className="profile-title">
                        <h3>{`${firstName} ${secondName} ${lastName}`}</h3>
                        <span>{typeText}</span>
                        <Button type="button" onClick={this.onClickButton}>Написать сообщение</Button>
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
        );
    }
}


const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    userInfo: state.users.userInfo,
    userInfoId: state.users.userInfo._id,
    errorMessage: state.users.errorMessage
});

const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
