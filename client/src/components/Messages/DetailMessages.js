import React, {Component} from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {messageActions} from '../../actions/messageActions';
import {userActions} from '../../actions/userActions';
import * as Utils from '../../utils';

class DetailMessages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentWillMount() {
        const {toId, fromId} = this.props.params;
        Utils.getFromUrlWithBody(`http://localhost:3000/messages`, { toId, fromId }).then((messages) => {
            this.setState({ messages });
        });
    }

    renderMessage(message, index) {
        const text = message.message;
        const date = message.date;

        return (
          <Row key={index}>
              <Col md={12}>{text}</Col>
              <Col md={12}>{date}</Col>
          </Row>
        );
    }

    render() {
        const {messages} = this.state;
        return (
            <Row>
                <Col md={12}>
                    {messages.map((message, index) => {
                        return (
                            <div key={index}>
                                <span>{message.message}</span>
                                <span>{message.date}</span>
                            </div>
                        );
                    })}
                </Col>
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
