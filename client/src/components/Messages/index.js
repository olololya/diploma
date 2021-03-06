import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory, Link } from 'react-router';
import {messageActions} from '../../actions/messageActions';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';

import './styles.scss';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.update = this.update.bind(this);
    }

    update(props) {
        const {currentUserId} = props;
        Utils.getFromUrlGET(`http://localhost:3000/messages/user/${currentUserId}`).then(users => {
            if (users && !users.length) {
                this.setState({ users: [] });
                return;
            }
            for (let i = 0; i < users.length; i++) {
                const id = users[i];
                Utils.getFromUrlGET(`http://localhost:3000/users/profile/${id}`)
                    .then(data => {
                        users[i] = {
                            id,
                            firstName: data.user.firstName,
                            secondName: data.user.secondName
                        };
                        return Utils.getFromUrlWithBody(`http://localhost:3000/messages`, { currentUserId, id });
                    }).then((messages) => {
                    for (let j = 0; j < messages.length; j++) {
                        if (messages[j].fromId === id && messages[j].status === 'new') {
                            users[i].hasNewMessage = true;
                            break;
                        }
                    }
                    this.setState({ users });
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notification && nextProps.notification.type === 'message') {
            this.update(nextProps);
        }
    }

    componentWillMount() {
        this.update(this.props);
    }

    renderUser(user, index) {
        const {id, firstName, secondName, hasNewMessage} = user;
        let className = 'user-container';
        if (hasNewMessage) {
            className += ' new-message';
        }

        return (
            <Row key={index} >
                <Link to={`/personal_area/messages/${id}`}>
                    <Col md={8} mdOffset={2} className={className}>
                        {`${secondName} ${firstName}`}
                        {hasNewMessage && <div className="new-message-text">Новое сообщение!</div>}
                    </Col>
                </Link>
            </Row>
        );
    }

    render() {
        const {users} = this.state;
        return (
            <Row>
                <Col md={12}>
                    {users && users.length ? users.map((user, index) => {
                        return this.renderUser(user, index);
                    }) : <div>Сообщений не найдено</div>}
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    currentUserId: state.users.currentUser.id,
    messages: state.messages.messages,
    errorMessage: state.messages.errorMessage,
    notification: state.messages.notification
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
