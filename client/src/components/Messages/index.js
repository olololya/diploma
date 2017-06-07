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
        }
    }

    componentWillMount() {
        const {currentUserId} = this.props;
        Utils.getFromUrl(`http://localhost:3000/messages/${currentUserId}`).then((users) => {
            if (users && !users.length) {
                this.setState({ users: [] });
                return;
            }
            for (let i = 0; i < users.length; i++) {
                const id = users[i];
                Utils.getFromUrl(`http://localhost:3000/users/profile/${id}`)
                    .then((userInfo) => {
                        users[i] = {
                            id,
                            firstName: userInfo.firstName,
                            secondName: userInfo.secondName
                        };
                        this.setState({ users });
                    });
            }
        });
    }

    renderUser(user, index) {
        const {id, firstName, secondName} = user;
        const {currentUserId} = this.props;
        return (
            <Row key={index} >
                <Link to={`/personal_area/messages/${currentUserId}-${id}`}>
                    <Col md={8} mdOffset={2} className="user-container">
                        {`${firstName} ${secondName}`}
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
    errorMessage: state.messages.errorMessage
});

const mapDispatchToProps = dispatch => ({
    messageActions: bindActionCreators(messageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
