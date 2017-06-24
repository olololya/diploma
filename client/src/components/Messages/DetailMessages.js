import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

        Utils.updateBindings(this, ['onChangeInput', 'onClickButton', 'scrollToBottom', 'setMessagesToOld']);
    }

    componentWillMount() {
        const {currentUserId, params} = this.props;
        const {id} = params;
        Utils.getFromUrlGET(`http://localhost:3000/users/profile/${currentUserId}`).then(data => {
            this.setState({ currentUserInfo: data.user });
            return Utils.getFromUrlGET(`http://localhost:3000/users/profile/${id}`);
        }).then(data => {
            this.setState({ companionUserInfo: data.user });
            return Utils.getFromUrlWithBody(`http://localhost:3000/messages`, { currentUserId, id });
        }).then((messages) => {
            this.props.messageActions.loadMessages(messages);
            this.setMessagesToOld(messages);
        });
    }

    setMessagesToOld(messages) {
        const {currentUserInfo} = this.state;
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].status === 'new' && messages[i].toId === currentUserInfo._id) {
                Utils.getFromUrlWithBody(`http://localhost:3000/messages/setToOld`, { id: messages[i]._id });
            }
        }
    }

    onChangeInput(event) {
        this.setState({ newMessage: event.target.value });
    }

    onClickButton() {
        const {params, currentUserId} = this.props;
        const date = new Moment();
        const message = {
            toId: params.id,
            fromId: currentUserId,
            message: this.state.newMessage,
            date: date.format('HH:mm:ss DD.MM.YYYY'),
            status: 'new'
        };
        this.props.messageActions.sendMessage({
            message,
            notification: null
        });

        this.setState({ newMessage: '' });
    }

    scrollToBottom() {
        if (this.inputContainer) {
            const element = ReactDOM.findDOMNode(this.inputContainer);
            element.scrollIntoView();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setMessagesToOld(nextProps.messages);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    renderMessage(data, index) {
        const {fromId, message, date} = data;
        const {currentUserInfo, companionUserInfo} = this.state;
        const userName = fromId === currentUserInfo._id ? `${currentUserInfo.secondName} ${currentUserInfo.firstName}`
            : `${companionUserInfo.secondName} ${companionUserInfo.firstName}`;

        return (
            <div key={index} className="message-container">
                <Row className="message-title">
                    <Link to={`/personal_area/profile/${fromId}`}>
                        <Col className="user-name">{userName}</Col>
                    </Link>
                    <Col className="date-message">{date}</Col>
                </Row>
                <Row>
                    <Col md={12} className="message">{message}</Col>
                </Row>
            </div>
        );
    }

    render() {
        const {messages = []} = this.props;
        return (
            <Row className="detail-messages-container">
                <Col md={8} mdOffset={2} className="messages-container">
                    {messages.map((message, index) => this.renderMessage(message, index))}
                </Col>
                <Col md={8}
                     mdOffset={2}
                     className="input-container"
                     ref={(ref) => this.inputContainer = ref}
                >
                    <InputGroup>
                        <FormControl componentClass="textarea"
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
        );
    }
}


const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    messages: state.messages.messages,
    errorMessage: state.messages.errorMessage
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailMessages);
