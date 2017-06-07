import React, {Component} from 'react';
import {
    Row,
    Col,
    FormControl,
    InputGroup,
    Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {messageActions} from '../../actions/messageActions';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';

import Moment from 'moment';

class DetailMessages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newMessage: '',
            currentUserInfo: {},
            companionUserInfo: {}
        };

        Utils.updateBindings(this, ['onChangeInput', 'onClickButton']);
    }

    componentWillMount() {
        const {toId, fromId} = this.props.params;
        Utils.getFromUrlWithBody(`http://localhost:3000/messages`, { toId, fromId }).then((messages) => {
            this.props.messageActions.loadMessages(messages);
        });

        Utils.getFromUrl(`http://localhost:3000/users/profile/${toId}`).then((userInfo) => {
            this.setState({ currentUserInfo: userInfo });
        });

        Utils.getFromUrl(`http://localhost:3000/users/profile/${fromId}`).then((userInfo) => {
            this.setState({ companionUserInfo: userInfo });
        });
    }

    onChangeInput(event) {
        this.setState({ newMessage: event.target.value });
    }

    onClickButton() {
        const {toId, fromId} = this.props.params;
        const date = new Moment();
        this.props.messageActions.sendMessage({
            toId,
            fromId,
            message: this.state.newMessage,
            date: date.format('hh:mm:ss, DD.MM.YYYY')
        });

        this.setState({ newMessage: '' });
    }

    renderMessage(data, index) {
        const {fromId, toId, message, date} = data;
        const {currentUserInfo, companionUserInfo} = this.state;
        const userName = toId === currentUserInfo._id ? `${currentUserInfo.firstName} ${currentUserInfo.secondName}`
            : `${companionUserInfo.firstName} ${companionUserInfo.secondName}`;

        return (
            <Row key={index} className="message-container">
                <Row className="message-title">
                    <Link to={`/personal_area/profile/${toId}`}>
                        <Col className="user-name">{userName}</Col>
                    </Link>
                    <Col className="date-message">{date}</Col>
                </Row>
                <Row>
                    <Col md={12} className="message">{message}</Col>
                </Row>
            </Row>
        );
    }

    render() {
        const {messages = []} = this.props;
        return (
            <Row className="detail-messages-container">
                <Col md={8} mdOffset={2} className="messages-container">
                    {messages.map((message, index) => this.renderMessage(message, index))}
                </Col>
                <Row className="input-container">
                    <Col md={6}>
                        <InputGroup>
                            <FormControl type="text"
                                         placeholder="Введите сообщение"
                                         value={this.state.newMessage}
                                         onChange={this.onChangeInput}
                            />
                            <InputGroup.Button>
                                <Button onClick={this.onClickButton}>Отправить</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    messages: state.messages.messages,
    errorMessage: state.messages.errorMessage
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailMessages);
