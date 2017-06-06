import React, {Component} from 'react';
import {
    Row,
    Col,
    FormControl,
    Button
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
            newMessage: ''
        };

        Utils.updateBindings(this, ['onChangeInput', 'onClickButton']);
    }

    componentWillMount() {
        const {toId, fromId} = this.props.params;
        Utils.getFromUrlWithBody(`http://localhost:3000/messages`, { toId, fromId }).then((messages) => {
            this.props.messageActions.loadMessages(messages);
        });
    }

    onChangeInput(event) {
        this.setState({ newMessage: event.target.value });
    }

    onClickButton() {
        const {toId, fromId} = this.props.params;
        this.props.messageActions.sendMessage({
            toId,
            fromId,
            message: this.state.newMessage,
            date: new Date()
        });

        this.setState({ newMessage: '' });
    }

    render() {
        const {messages = []} = this.props;
        return (
            <Row>
                <Row>
                    <Col md={12}>
                        {messages.map((message, index) => {
                            return (
                                <div key={index}>
                                    <span>{`${index} - ${message.message} - (${message.date})`}</span>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <FormControl type="text"
                                     placeholder="Введите сообщение"
                                     value={this.state.newMessage}
                                     onChange={this.onChangeInput}
                        />
                        <Button onClick={this.onClickButton}>Отправить</Button>
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
